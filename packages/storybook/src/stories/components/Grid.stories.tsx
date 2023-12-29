import React from 'react'
import { Story, withStory } from '../../util'

import { Grid as GridComponent } from '@/design-system'

type Args = {
  showOverlay: boolean
}

const overlayClasses =
  'bg-grey100 fixed h-full top-0 left-0 right-0 z-50 opacity-40'

const GridOverlay = ({ showOverlay }: Args) => (
  <>
    <GridComponent className={`grid md:hidden ${overlayClasses}`}>
      {showOverlay
        ? [...Array(6)].map((_, i) => (
            <div key={`${i}-small`} className="bg-[#FFb0A2]" />
          ))
        : null}
    </GridComponent>
    <GridComponent className={`hidden md:grid ${overlayClasses}`}>
      {showOverlay
        ? [...Array(12)].map((_, i) => (
            <div key={`${i}-med`} className="bg-[#FFb0A2]" />
          ))
        : null}
    </GridComponent>
  </>
)
const title = 'Components/Grid'
const options = {
  render: ({ showOverlay }: Args) => (
    <>
      <GridOverlay showOverlay={showOverlay} />
      <GridComponent>
        <div className="col-span-3 md:col-span-6 bg-grey200 p-16">
          This content takes up half of the grid
        </div>
      </GridComponent>
    </>
  )
}
const { meta } = withStory(GridComponent, options)
export default { ...meta, title }

const args = { showOverlay: true }

export const Grid: Story<typeof meta> = {
  args
}
