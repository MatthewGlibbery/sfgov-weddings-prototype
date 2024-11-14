import { classed, classes, HeadingXXl } from '@/design-system'
import { TypeTableBlockValues, TypeTableValues } from '@/types'
import { RichText } from './RichText'

const wrapperStyles = {
  background: `linear-gradient(to right, white, white),
      linear-gradient(to right, white, white),
  
      linear-gradient(to right, rgba(0,0,0,.25), rgba(255,255,255,0.001)),
      linear-gradient(to left, rgba(0,0,0,.25), rgba(255,255,255,0.001))`,

  backgroundPosition: 'left center, right center, left center, right center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '20px 100%, 10px 100%, 10px 100%, 10px 100%',

  backgroundAttachment: 'local, local, scroll, scroll'
}
const baseCellClasses = classes(
  'p-20 border-b-1 border-solid border-neutral200',
  'min-w-[130px] md:min-w-[140px] lg:min-w-[120px] text-left'
)

const TableWrapper = classed('div', 'whitespace-nowrap overflow-auto')

const TableHeader = classed('th', {
  base: classes(baseCellClasses, 'bg-neutral50'),
  variants: {
    row: {
      true: 'border-r-1'
    }
  }
})

const TableData = classed('td', classes(baseCellClasses))

export const Table = (props: TypeTableBlockValues) => {
  const { table_header_options: headers, table } = props

  const buildTableData = (
    headers: string | undefined,
    table: TypeTableValues
  ) => {
    const rows = []
    let tableHead

    if (table.columns.length) {
      if (headers === 'neither' || !headers) {
        rows.push(
          <tr className="border-t-1 border-solid border-neutral200">
            {table.columns.map((column, i) => (
              <TableData key={i}>{column.heading}</TableData>
            ))}
          </tr>
        )
      } else if (headers === 'row' || headers === 'both') {
        tableHead = (
          <thead>
            <tr>
              {table.columns.map((column, i) => (
                <TableHeader key={i} scope="col">
                  {column.heading}
                </TableHeader>
              ))}
            </tr>
          </thead>
        )
      } else if (headers === 'column') {
        rows.push(
          <tr className="border-t-1 border-solid border-neutral200">
            {table.columns.map((column, i) =>
              i === 0 ? (
                <TableHeader scope="row" key={i} row={true}>
                  {column.heading}
                </TableHeader>
              ) : (
                <TableData key={i}>{column.heading}</TableData>
              )
            )}
          </tr>
        )
      }
    }

    for (const rowData of table.rows) {
      let rowBody

      if (headers === 'neither' || !headers) {
        rowBody = rowData.values.map((value, i) => (
          <TableData key={i}>
            <RichText html={value} />
          </TableData>
        ))
      } else if (headers === 'row' || headers === 'both') {
        rowBody = rowData.values.map((value, i) =>
          i === 0 && headers === 'both' ? (
            <TableHeader scope="row" key={i} row={true}>
              <RichText html={value} />
            </TableHeader>
          ) : (
            <TableData key={i}>
              <RichText html={value} />
            </TableData>
          )
        )
      } else if (headers === 'column') {
        rows.push(
          <tr>
            {rowData.values.map((value, i) =>
              i === 0 ? (
                <TableHeader scope="row" key={i} row={true}>
                  <RichText html={value} />
                </TableHeader>
              ) : (
                <TableData key={i}>
                  <RichText html={value} />
                </TableData>
              )
            )}
          </tr>
        )
      }

      rows.push(<tr>{rowBody}</tr>)
    }

    return (
      <>
        {tableHead || null}
        <tbody>{rows.map((row) => row)}</tbody>
      </>
    )
  }

  const tableContent = buildTableData(headers, table)

  return (
    <div className="space-y-20">
      {table.caption ? (
        <HeadingXXl as="h2" aria-hidden="true">
          {table.caption}
        </HeadingXXl>
      ) : null}

      <TableWrapper style={wrapperStyles}>
        <table className="w-full">
          {table.caption ? (
            <caption className="sr-only">{table.caption}</caption>
          ) : null}
          {tableContent}
        </table>
      </TableWrapper>
    </div>
  )
}
