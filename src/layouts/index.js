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
  const opts = { layout, ...options }

  traits(editor, opts)
  container(editor, opts)
  column(editor, opts)
  row(editor, opts)

  blocks(editor, opts)
}
