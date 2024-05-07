import { columnBlock } from './column'
import { containerBlock } from './container'
import { rowBlock } from './row'

export default (editor, options = {}) => {
  const { BlockManager } = editor

  BlockManager.getCategories().each((category) => {
    if (category.get('id') === 'Layout') {
      category.set('order', 1)
    } else {
      category.set('order', 2)
    }
  })

  containerBlock(editor, options)
  rowBlock(editor, options)
  columnBlock(editor, options)
}
