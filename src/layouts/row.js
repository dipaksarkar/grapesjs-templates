import { isComponent, rowTraits } from '../utils'

const type = 'row'
const componentName = 'Row'

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
    model: {
      defaults: {
        draggable: '.row',
        tagName: 'div',
        droppable: true,
        ...defaultType.model.prototype.defaults,
        traits: [...rowTraits],
        'custom-name': componentName
      }
    }
  })
}

export const rowBlock = (editor, options = {}) => {
  const { layout } = options
  const { category } = layout
  const { Blocks } = editor

  // Create a block for the Plans component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M6.656 6.464h2.88v2.88h1.408v-2.88h2.88V5.12h-2.88V2.24H9.536v2.88h-2.88zM0 17.92V0h20.48v17.92H0zm7.68-2.56h5.12v-3.84H7.68v3.84zm-6.4 0H6.4v-3.84H1.28v3.84zM19.2 1.28H1.28v9.024H19.2V1.28zm0 10.24h-5.12v3.84h5.12v-3.84z"></path> </g> </g></svg>',
    content: {
      type: type,
      classes: [type],
      components: [
        {
          type: 'column',
          classes: ['col-sm-3'],
          components: `<p style="margin: 15px">3/12</p>`
        },
        {
          type: 'column',
          classes: ['col-sm-9'],
          components: `<p style="margin: 15px">9/12</p>`
        }
      ]
    },
    category: category
  })
}
