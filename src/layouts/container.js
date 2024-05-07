import { containerTraits, isComponent } from '../utils'

const type = 'container'
const componentName = 'Container'

export default (cm, options = {}) => {
  // Define custom component properties and traits
  cm.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => {
      if (isComponent(el, type)) {
        return { type }
      }
    },
    extend: 'default',
    model: {
      defaults: {
        name: componentName,
        tagName: 'div',
        droppable: true,
        attributes: { class: type },
        traits: containerTraits,
        components: `<p style="margin: 15px 0px">Container</p>`,
        style: {
          padding: '15px'
        }
      }
    }
  })
}

export const containerBlock = (bm, options = {}) => {
  const { category } = options.layout

  // Create a block for the Plans component
  bm.add(type, {
    label: componentName,
    media:
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M501.333,96H10.667C4.779,96,0,100.779,0,106.667v298.667C0,411.221,4.779,416,10.667,416h490.667 c5.888,0,10.667-4.779,10.667-10.667V106.667C512,100.779,507.221,96,501.333,96z M490.667,394.667H21.333V117.333h469.333 V394.667z"></path> </g> </g> </g></svg>',
    content: { type: type },
    select: true,
    category: category
  })
}
