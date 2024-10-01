/** @jsx h */
/** @jsxFrag null */
/** @jsxRuntime classic */
import h from 'vhtml'
import type {
  SingleColumnSchema,
  ColumnsSchema,
  ComponentContext
} from '../types'
import type { ComponentProps } from 'react'

export default { form }

type ColumnsContext = ComponentContext<ColumnsSchema> & {
  columnComponents: string[]
  columnKey: string
}

export function form({
  component,
  columnComponents,
  columnKey
}: ColumnsContext) {
  const columns = 12
  return (
    <div className="flex flex-wrap">
      {component.columns.map((col, index) => (
        <Column
          // when the component renders, all of the column's properties are
          // defined
          column={col as Required<SingleColumnSchema>}
          key={index}
          ref={columnKey}
          dangerouslySetInnerHTML={{ __html: columnComponents[index] }}
        />
      ))}
    </div>
  )

  // eslint-disable-next-line react/function-component-definition
  function Column({
    column: col,
    ...rest
  }: ComponentProps<'div'> & { column: Required<SingleColumnSchema> }) {
    const style: Record<string, string> = {
      width: percent(col.currentWidth / columns)
    }
    if (col.offset) {
      style['margin-left'] = percent(-col.offset / columns)
    }
    return (
      <div
        // @ts-expect-error style is a string in vhtml
        style={Object.entries(style)
          .map(([name, value]) => `${name}: ${value}`)
          .join('; ')}
        {...rest}
      />
    )
  }
}

function percent(fraction: number) {
  const n = fraction * 100
  return n % 1 > 0.01 ? n.toPrecision(9) + '%' : n + '%'
}
