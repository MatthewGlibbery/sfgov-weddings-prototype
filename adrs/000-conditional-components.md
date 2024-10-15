# Conditional React rendering

* Status: **accepted**
* Deciders: Derek, Ant, Joni
* Date: 2024-10-10

Technical Story: [PUBX-700](https://sfgovdt.jira.com/browse/PUBX-700)

## Context and Problem Statement

We are having a lot of issues with pages failing to render. We need to collect some more information to understand the cause(s), but at least one that we have identified is our our (mis)use of components from [react-if] that are both causing runtime errors that cause the entire page to 500 and masking a lack of test coverage for conditionally rendered content. Specifically, with respect to conditional _components_ (`<When>`, `<If>`, `<Switch>`, et al):

1. Unless you use the render callback form (`<When>{() => <Conditional />}</When>`), anything you render inside of the "conditional" component will be [eagerly evaluated](https://www.npmjs.com/package/react-if#delaying-evaluation-of-children--condition) but just not _rendered_ by `<When>`. And if anything in the content fails to evaluate (for instance, when you pass `undefined` to a component that's expecting to destructure properties from an object), you'll get a runtime error.

1. The components make your code difficult for our tools to statically analyze because they don't "understand" how the components work. Whenever possible, we should use JavaScript for conditional rendering and other logic, which allows TypeScript to infer types when using type guards, and allows Jest to collect code coverage on conditional statements like ternary expressions.

The more that we use `<When>` without render callbacks, the more we push the responsibility for dealing with null/undefined values down the component stack. There may be cases in which it's helpful for low-level component to handle empty values gracefully, but generally we should aim to have the lower-level components be as simple as possible, and move conditional rendering as far "up" the stack as we can, which will also give us a performance boost because there will just be fewer things (React components) to render.

<details>
  <summary>
    <h3>Wait, but why?</h3>
  </summary>

Despite its roots in XML (which is a declarative syntax), JSX is really just JavaScript, and fundamentally _imperative_: every JSX expression is a function call to (more or less) `React.createElement()`, and is evaluated _every time_ a component renders. The example above compiles down to something like this:

```js
const jsx = require('react').createElement
const { When } = require('react-if')
const { AgencyDetail } = require('./AgencyDetail')

export function DepartmentPage({ page }) {
  return jsx(When, {
    condition: page.agencies.length,
    children: [
      jsx(AgencyDetail, {
        agency: page.agencies[0].value  // 💥
      })
    ]
  })
}
```

</details>

## Decision Drivers <!-- optional -->

* High error rates on the front end from runtime errors in rendering logic that _should_ be conditional but really isn't
* Poor test coverage:
    - Many (most?) of the conditional rendering statements in our components are not covered by tests directly (because they've been masked by `<When>` "breaking" coverage of individual statements and branches)
    - Page and block-specific components that render data from the content API aren't being exercised fully because our data factories return "optimistically" complete data and we don't test realistically sparse permutations of each
    - Some of our components are getting [incidental coverage] rather than having all of their conditional logic tested directly


## Considered Options

1. [Option 1](#option-1): Factor out our use of `react-if` components, specifically: `<When>`, `<If>`, `<Then>`, `<Else>`, `<Switch>`, `<Case>`, and `<Default>`.
1. [Option 2](#option-2): Refactor our instances of `react-if` components to use render callbacks instead of unconditionally ("eagerly") evaluated

## Decision Outcome

Chosen option: [option 1](#option-1), because the declarative components work against our coverage tools and require more mental gymnastics to read and write than "native" JavaScript conditions.

### Positive Consequences <!-- optional -->

* Fewer errors: we won't evaluate expressions that aren't valid under specific data conditions (you could call this "_actually_ conditional rendering")
* More accurate test coverage metrics: using JavaScript expressions will allow test coverage (and other static analysis) tools to know which statements and branches aren't being exercised by out tests

### Negative Consequences <!-- optional -->

* Time: this is a big, broad, and relatively "expensive" refactor that will touch most of the components in our codebase and lower our true test coverage, which will then require improving our tests to get our statement and branch coverage up to 100% (note that our current threshold is 90%, so this is not necessarily a step "backward" in the sense that we're already below 100%)

* Old habits die hard: everyone who has done work on the front end will need to be "trained" (by documentation, linting rules, etc.) how to do things the new way.

## Pros and Cons of the Options <!-- optional -->

### Option 1

Factor out our use of `react-if` components (`<When>`, `<If>`, `<Then>`, `<Else>`, `<Switch>`, `<Case>`, and `<Default>`) and replace them with native JavaScript expressions. Most instances of `<When>` can easily be replaced with a tenary expression:

```jsx
// before
<When condition={CONDITION}>
  <Content />
</When>

// after
{CONDITION ? (
  <Content />
) : null}
```

* Good, because it reduces the likelihood of runtime errors with conditionally evaluating expressions
* Good, because it gives us accurate test coverage
* Good, because it reduces the cognitive overload by eliminating `react-if` components
* Bad, because it's a big change that will require tight coordination to avoid confusing merge conflicts across the codebase

### Option 2

Refactor our instances of `react-if` components to use render callbacks instead of unconditionally ("eagerly") evaluated. Every instance of `<When>`, for instance, would be rewritten to have its children in a render callback function:

```jsx
// before
<When condition={CONDITION}>
  <Content />
</When>

// after
<When condition={CONDITION}>
  {() => <Content />}
</When>
```

* Good, because it reduces the likelihood of runtime errors with conditionally evaluating expressions
* Bad, because it defeats some (but not all) static analysis tools. For instance, TypeScript is unable to determine if a value is truthy when the condition isn't part of a JavaScript conditional expression:

    ```ts
    <When condition={block}>
      {() => {
        return <Thing data={block.value} />
        //                       ~~~~~~
        //                       block may be undefined
      }}
    </When>
    ```

* Bad, because `react-if` is an easy footgun that we can't truly prevent anyone from using without imposing new rules (linting or other CI logic) that forbid it explicitly

## Links <!-- optional -->
- [react-if]
- [incidental coverage]

[react-if]: https://romac.github.io/react-if/
[incidental coverage]: https://jasonrudolph.com/blog/2008/06/17/testing-anti-patterns-incidental-coverage/
* [
