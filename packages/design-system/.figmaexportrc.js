const transformSVGO = require('@figma-export/transform-svg-with-svgo')
const outputAsSVG = require('@figma-export/output-components-as-svg')
const outputAsReact = require('@figma-export/output-components-as-svgr')
const svgoConfig = require('./svgo.config')
const { writeFile } = require('node:fs/promises')

/**
 * @typedef {import('@figma-export/types').ComponentNode} ComponentNode
 * @typedef {import('@figma-export/types').ComponentOutputter} ComponentOutputter
 * @typedef {import('@figma-export/types').FigmaExportRC} FigmaExportRC
 * @typedef {import('@figma-export/types').PageNode} PageNode
 */

const fileId = process.env.FIGMA_ICONS_FILE
const svgDir = './icons/svg'
const componentsDir = './components/icons'

/** @type {FigmaExportRC} */
module.exports = {
  commands: [
    [
      'components',
      {
        fileId,
        onlyFromPages: ['UI'],
        transformers: [transformSVGO(svgoConfig)],
        outputters: [
          outputAsSVG({
            output: svgDir,
            getDirname: ({ dirname }) => dirname,
            getBasename: ({ componentName }) =>
              `${normalizeIconName(componentName)}.svg`
          }),
          outputSVGIndex({
            output: `${svgDir}/index.json`
          }),
          outputAsReact({
            output: componentsDir,
            getDirname: ({ dirname }) => dirname,
            getComponentName: ({ componentName }) =>
              normalizeComponentName(componentName),
            getComponentFilename: ({ componentName }) =>
              normalizeComponentName(componentName)
          }),
          outputReactIndex({
            output: `${componentsDir}/index.json`
          })
        ]
      }
    ]
  ]
}

/**
 * @param {string} name
 * @returns {string}
 */
function normalizeIconName(name) {
  return name.toLowerCase().replace(/ /g, '-')
}

function normalizeComponentName(name) {
  return `Icon${name
    .replace(/icon/g, '')
    .replace(/(^[a-z])|( [a-z])|-([a-z])|_([a-z])|\.[a-z]/g, (substr) =>
      substr.toUpperCase()
    )
    .replace(/[.]|Ui|\d|-|_/g, '')}`
}

/**
 * @param {{ output: string }} options
 * @returns {import('@figma-export/types').ComponentOutputter}
 */
function outputSVGIndex({ output }) {
  return async (pages) => {
    const components = gatherComponents(pages)
    const index = {
      generated: timestamp(),
      components: components.map(
        ({ page, component: { id, name, svg, ...rest } }) => ({
          id: normalizeIconName(name),
          name,
          file: `${normalizeIconName(name)}.svg`,
          size: getSize(rest),
          href: `https://figma.com/file/${fileId}/${page.name}?node-id=${id}`,
          svg
        })
      )
    }
    await writeJSON(output, index)
  }
}

/**
 * @param {{ output: string }} options
 * @returns {ComponentOutputter}
 */
function outputReactIndex({ output }) {
  return async (pages) => {
    const components = gatherComponents(pages)
    const index = {
      generated: timestamp(),
      components: components.map(
        ({ page, component: { id, name, ...rest } }) => ({
          id: normalizeIconName(name),
          name,
          component: normalizeComponentName(name),
          file: `${normalizeComponentName(name)}`,
          size: getSize(rest),
          href: getFigmaHref(page, id)
        })
      )
    }
    await writeJSON(output, index)
  }
}

/**
 * @param {PageNode[]} pages
 * @returns {{ page: PageNode, component: ComponentNode }[]}
 */
function gatherComponents(pages) {
  return pages.flatMap((page) =>
    page.components
      .filter((component) => {
        return component.name.includes('20')
      })
      .map((component) => ({ component, page }))
  )
}

/**
 *
 * @param {PageNode} page
 * @param {string} nodeId
 * @returns {string}
 */
function getFigmaHref(page, nodeId) {
  const url = new URL(`https://figma.com/file/${fileId}/${page.name}`)
  if (nodeId) {
    url.searchParams.set('node-id', nodeId)
  }
  return url.href
}

async function writeJSON(output, data) {
  return writeFile(output, JSON.stringify(data, null, 2))
}

function timestamp() {
  return new Date().toISOString()
}

/**
 * @param {Partial<ComponentNode>} component
 */
function getSize({ absoluteBoundingBox: { width, height } }) {
  return {
    width: Number(width),
    height: Number(height)
  }
}
