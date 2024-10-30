/**
 * This is a mock for the _component_ returned by the mocked implementation of
 * next/dynamic's default export. You can use it as a spy (e.g. to assert that
 * it received the expected props) and/or mock the implementation to simulate
 * the behavior of a dynamically imported component in tests:
 *
 * ```js
 * import { SomeComponent } from './SomeComponent'
 * import { MockDynamicComponent } from '@/__mocks__/next/dynamic'
 *
 * describe('SomeComponent', () => {
 *   beforeEach(() => MockDynamicComponent.mockReset())
 *
 *   it('renders the dynamic component with expected props', () => {
 *     render(<SomeComponent />)
 *     expect(MockDynamicComponent).toHaveBeenLastCalledWith(
 *       { ... },
 *       {} // empty ref
 *     )
 *   })
 * })
 * ```
 */
export const MockDynamicComponent = jest.fn((props: object) => <></>)

/**
 * Our mock implementation of dynamic() just returns the component mock. We may
 * need to flesh this out more to match next/dynamic's API later.
 */
export default jest.fn(() => MockDynamicComponent)
