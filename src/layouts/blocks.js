import { columnBlock } from './column'
import { containerBlock } from './container'
import { rowBlock } from './row'

export default (editor, options = {}) => {
  const { BlockManager } = editor

  containerBlock(BlockManager, options)
  rowBlock(BlockManager, options)
  columnBlock(BlockManager, options)
}
