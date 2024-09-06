/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyFunction = (...args: any[]) => any

// 🙃
type MethodOf<T extends object> = {
  [K in keyof T]: T[K] extends (this: T, ...args: any[]) => any | AnyFunction
    ? K
    : never
}[keyof T]

/**
 * Replace the named method on an object with a new function that receives the
 * original implementation as the first argument:
 *
 * ```js
 * const foo = {
 *   render (x: string) => `yo(${x})`
 * }
 *
 * hook(foo, 'render', (render, x: string) => render(x.toUpperCase()))
 *
 * foo.render('hi') // 'yo(HI)'
 * ```
 *
 * Note the typescript gymnastics here provide autocomplete on the method name
 * and don't ensure type safety of the function signature.
 */
export function hook<T extends object>(
  obj: T,
  method: MethodOf<T>,
  wrap: (impl: AnyFunction, ...args: any[]) => any
) {
  const impl = obj[method] as AnyFunction
  // @ts-expect-error derp
  obj[method] = function (...args: any[]) {
    return wrap.call(this, impl.bind(this), ...args)
  }
  return impl
}
