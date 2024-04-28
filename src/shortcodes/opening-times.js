import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { openingTimesTraits } = options
  const { Blocks, Components } = editor
  const type = 'opening-times'
  const componentName = 'Opening Times'
  const defaultType = Components.getType('shortcode')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => {
      if (isComponent(el, type)) {
        return { type }
      }
    },
    extend: 'shortcode',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        'custom-name': componentName,
        attributes: {
          class: type
        },
        content: `[${type}]`,
        traits: [...openingTimesTraits, ...defaultType.model.prototype.defaults.traits]
      },
      handlePropChange() {
        const attributes = this.getShortCodeProps().join(' ')
        const shortcode = `[${type}${attributes ? ` ${attributes}` : ''}]`
        this.set('content', shortcode)
        this.set('shortcode', shortcode)
      },
      toHTML() {
        const attributes = this.getDataAttributes().join(' ')
        const shortcode = this.get('shortcode')
        return `<div class="${type}" data-type="${type}" ${attributes}>${shortcode}</div>`
      }
    },
    view: defaultType.view.prototype
  })

  // Create a block for the Opening Times component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>',
    content: { type: type },
    category: 'Short Codes'
  })
}
