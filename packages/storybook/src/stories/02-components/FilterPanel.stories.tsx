import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterPanel } from '@/components/weddings/FilterPanel'
import type { WeddingFilters } from '@/components/weddings/types'

const EMPTY_FILTERS: WeddingFilters = { eventTypes: [], locations: [] }

const meta = {
  title: 'Weddings/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The FilterPanel lets users narrow wedding availability by event type
and location. Checkboxes update a **draft** state locally — the
calendar and results list do not change until the user clicks
**Apply**. A **Reset filters** button clears both draft and applied
state.

## Interaction model

1. User toggles checkboxes → only local draft state changes
2. User clicks **Apply** → draft is committed to URL params, calendar
   and results update
3. User clicks **Reset filters** → both draft and applied state clear

## Cross-disable logic

- Selecting an event type disables locations that don't support it
  (e.g. selecting "Two-hour wedding" disables Mayor's Balcony and
  Fourth Floor Gallery since only the Rotunda hosts 2-hour events).
- Selecting a location disables event types that location doesn't
  support (e.g. selecting "The Rotunda" disables "One-hour wedding").

Cross-disable operates on the **draft** state in real-time so users
get immediate feedback about incompatible combinations before applying.

## Apply / Reset behaviour

| Action | Effect |
|--------|--------|
| Toggle checkbox | Updates draft only (no URL/calendar change) |
| Click **Apply** | Pushes draft to URL params → calendar + results update |
| Click **Reset filters** | Clears draft AND applied filters |

## Button visibility

| State | Apply visible | Reset visible |
|-------|--------------|---------------|
| No changes, no active filters | No | No |
| Draft differs from applied | Yes | Yes |
| Draft matches applied, filters active | No | Yes |

## Selected + Unavailable dates

When filters are applied and a previously-selected date becomes
unavailable under the new criteria, the calendar shows that date
with a neutral-100 filled circle (40px mobile / 56px desktop),
neutral-500 strikethrough text. Once the user selects a different
day, the old date reverts to the normal unavailable style (no circle,
grey strikethrough).
        `
      }
    }
  }
} satisfies Meta<typeof FilterPanel>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Wrapper that manages applied filter state so the story is
 * interactive end-to-end. Shows both the component and a live
 * readout of the applied state.
 */
function FilterPanelDemo({
  initialFilters = EMPTY_FILTERS
}: {
  initialFilters?: WeddingFilters
}) {
  const [applied, setApplied] = useState<WeddingFilters>(initialFilters)
  const [history, setHistory] = useState<string[]>([])

  const handleApply = (filters: WeddingFilters) => {
    setApplied(filters)
    setHistory((h) => [
      `Applied: types=[${filters.eventTypes.join(', ')}] ` +
        `locations=[${filters.locations.join(', ')}]`,
      ...h.slice(0, 9)
    ])
  }

  const handleReset = () => {
    setApplied(EMPTY_FILTERS)
    setHistory((h) => ['Reset: all filters cleared', ...h.slice(0, 9)])
  }

  return (
    <div className="flex gap-40">
      <div className="w-[344px] shrink-0">
        <FilterPanel
          filters={applied}
          onApply={handleApply}
          onReset={handleReset}
        />
      </div>
      <div className="flex-1 flex flex-col gap-20">
        <div className="p-20 bg-neutral50 rounded-4">
          <p className="font-bold text-body mb-8">
            Applied filters (what the calendar sees):
          </p>
          <pre className="text-label-xs font-mono whitespace-pre-wrap">
            {JSON.stringify(applied, null, 2)}
          </pre>
        </div>
        {history.length > 0 && (
          <div className="p-20 bg-neutral50 rounded-4">
            <p className="font-bold text-body mb-8">Event log:</p>
            <ul className="text-label-xs font-mono list-none p-0 m-0 flex flex-col gap-4">
              {history.map((entry, i) => (
                <li key={i} className="text-neutral700">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export const Default: Story = {
  name: 'Default (no filters)',
  parameters: {
    docs: {
      description: {
        story:
          'Starting state with no filters active. Toggle checkboxes ' +
          'and notice the Apply button appears. The right panel only ' +
          'updates when you click Apply.'
      }
    }
  },
  render: () => <FilterPanelDemo />
}

export const WithEventTypePreselected: Story = {
  name: 'Pre-applied: One-hour wedding',
  parameters: {
    docs: {
      description: {
        story:
          'Simulates the state after "One-hour wedding" has been ' +
          'applied. The Rotunda is disabled because it only hosts ' +
          '2-hour events. Toggle "Two-hour wedding" to re-enable it, ' +
          'then Apply.'
      }
    }
  },
  render: () => (
    <FilterPanelDemo initialFilters={{ eventTypes: ['1hr'], locations: [] }} />
  )
}

export const WithLocationPreselected: Story = {
  name: 'Pre-applied: The Rotunda',
  parameters: {
    docs: {
      description: {
        story:
          'Simulates the state after "The Rotunda" has been applied. ' +
          '"One-hour wedding" is disabled because the Rotunda only ' +
          'hosts 2-hour events.'
      }
    }
  },
  render: () => (
    <FilterPanelDemo
      initialFilters={{ eventTypes: [], locations: ['rotunda'] }}
    />
  )
}

export const AllFiltersActive: Story = {
  name: 'All filters active',
  parameters: {
    docs: {
      description: {
        story:
          'All event types and locations selected. No cross-disable ' +
          'occurs because every combination is covered. Click Reset ' +
          'to clear everything.'
      }
    }
  },
  render: () => (
    <FilterPanelDemo
      initialFilters={{
        eventTypes: ['1hr', '2hr'],
        locations: ['mayors-balcony', 'fourth-floor-gallery', 'rotunda']
      }}
    />
  )
}

export const CrossDisableDemo: Story = {
  name: 'Cross-disable: 2-hour selected',
  parameters: {
    docs: {
      description: {
        story: `
**Try this interaction:**

1. "Two-hour wedding" is pre-applied → Mayor's Balcony and Fourth
   Floor Gallery are disabled (they only host 1-hour events)
2. Check "One-hour wedding" in the draft → both locations re-enable
3. Click Apply → the applied state now includes both event types
4. Uncheck "One-hour wedding" → locations disable again in the draft
5. Click Apply → back to 2-hour only

Cross-disable operates on the **draft** so you get immediate visual
feedback before committing.
        `
      }
    }
  },
  render: () => (
    <FilterPanelDemo initialFilters={{ eventTypes: ['2hr'], locations: [] }} />
  )
}

export const DraftVsApplied: Story = {
  name: 'Draft vs Applied (deferred apply)',
  parameters: {
    docs: {
      description: {
        story: `
**Key behaviour to observe:**

1. Toggle any checkbox — the "Applied filters" panel does NOT change
2. The **Apply** button appears as soon as draft ≠ applied
3. Click Apply — now the panel updates and Apply disappears
4. Toggle again then click **Reset** — both draft and applied clear

This deferred-apply pattern prevents the calendar from re-rendering
on every checkbox interaction, which would cause jarring layout shifts
as availability cards appear/disappear.
        `
      }
    }
  },
  render: () => <FilterPanelDemo />
}

export const ResetBehaviour: Story = {
  name: 'Reset clears draft + applied',
  parameters: {
    docs: {
      description: {
        story: `
**Try this:**

1. Start with "One-hour wedding" pre-applied
2. Check "The Rotunda" (draft change)
3. Click **Reset filters** — both the pre-applied event type AND
   the draft location selection clear simultaneously
4. The panel returns to the fully empty state

Reset is a single action that clears everything, not just the
unapplied draft.
        `
      }
    }
  },
  render: () => (
    <FilterPanelDemo initialFilters={{ eventTypes: ['1hr'], locations: [] }} />
  )
}
