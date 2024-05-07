import { isComponent, rowTraits } from '../utils'

const type = 'row'
const componentName = 'Row'

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
        droppable: true,
        attributes: { class: type },
        traits: [...rowTraits]
      }
    }
  })
}

export const rowBlock = (bm, options = {}) => {
  const { layout } = options
  const { category } = layout

  // Create a block for the Plans component
  bm.add(type, {
    label: componentName,
    media:
      '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.033 482.033" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M217.764,80.987H12.126C5.442,80.987,0,86.429,0,93.113v124.718c0,6.687,5.442,12.127,12.126,12.127h205.632 c6.679,0,12.126-5.44,12.126-12.127V93.113C229.89,86.429,224.442,80.987,217.764,80.987z M218.101,217.831 c0,0.186-0.154,0.337-0.343,0.337H12.126c-0.184,0-0.342-0.151-0.342-0.337V93.113c0-0.186,0.153-0.336,0.342-0.336h205.632 c0.184,0,0.343,0.151,0.343,0.336V217.831z M469.913,80.987H264.274c-6.687,0-12.125,5.442-12.125,12.126v124.718 c0,6.687,5.438,12.127,12.125,12.127h205.633c6.682,0,12.126-5.44,12.126-12.127V93.113 C482.038,86.429,476.589,80.987,469.913,80.987z M470.252,217.831c0,0.186-0.153,0.337-0.345,0.337H264.274 c-0.184,0-0.338-0.151-0.338-0.337V93.113c0-0.186,0.154-0.336,0.338-0.336h205.633c0.183,0,0.345,0.151,0.345,0.336V217.831z M217.764,252.074H12.126C5.442,252.074,0,257.514,0,264.2v124.718c0,6.688,5.442,12.128,12.126,12.128h205.632 c6.679,0,12.126-5.439,12.126-12.128V264.2C229.89,257.514,224.442,252.074,217.764,252.074z M218.101,388.918 c0,0.186-0.154,0.339-0.343,0.339H12.126c-0.184,0-0.342-0.153-0.342-0.339V264.2c0-0.186,0.153-0.339,0.342-0.339h205.632 c0.184,0,0.343,0.153,0.343,0.339V388.918z M469.913,252.074H264.274c-6.687,0-12.125,5.439-12.125,12.126v124.718 c0,6.688,5.438,12.128,12.125,12.128h205.633c6.682,0,12.126-5.439,12.126-12.128V264.2 C482.038,257.514,476.589,252.074,469.913,252.074z M470.252,388.918c0,0.186-0.153,0.339-0.345,0.339H264.274 c-0.184,0-0.338-0.153-0.338-0.339V264.2c0-0.186,0.154-0.339,0.338-0.339h205.633c0.183,0,0.345,0.153,0.345,0.339V388.918z"></path> </g> </g></svg>',
    content: {
      type: type,
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
    select: true,
    category: category
  })
}
