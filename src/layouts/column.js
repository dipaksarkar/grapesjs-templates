import { colTraits, isComponent } from '../utils'

const type = 'column'
const componentName = 'Column'

export default (editor, options = {}) => {
  const { Components } = editor
  const defaultType = Components.getType('default')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => {
      if (isComponent(el, type)) {
        return { type }
      }
    },
    extend: 'default',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        'custom-name': componentName,
        tagName: 'div',
        droppable: true,
        traits: [...colTraits]
      }
    },
    view: defaultType.view.prototype
  })
}

export const columnBlock = (editor, options = {}) => {
  const { category } = options.layout
  const { Blocks } = editor

  // Create a block for the Plans component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 2v12h16v-12h-16zM7 13h-6v-10h6v10zM15 13h-6v-10h6v10z"></path> <path d="M10 4h4v1h-4v-1z"></path> <path d="M2 4h4v1h-4v-1z"></path> <path d="M2 6h4v1h-4v-1z"></path> <path d="M2 8h4v1h-4v-1z"></path> </g></svg>',
    content: {
      type: type,
      attributes: { class: 'col-sm-12' },
      components: `<p style="margin: 15px 0px">col-sm-12</p>`
    },
    category: category
  })
}
