import blocks from './blocks'
import column from './column'
import container from './container'
import row from './row'
import traits from './traits'

export const layout = {
  id: 'layout',
  category: 'Layout',
  block: {},
  classPrefix: 'layout'
}

export default (editor, options = {}) => {
  const { Components } = editor

  const opts = { layout, ...options, defaultModel: Components.getType('default').model }

  traits(editor, opts)
  container(Components, opts)
  column(Components, opts)
  row(Components, opts)

  blocks(editor, opts)
}
