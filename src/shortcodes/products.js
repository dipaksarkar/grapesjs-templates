import { defaultTraits, isComponent } from '../utils'

export default (editor, options = {}) => {
  const { productsTraits } = options
  const { Blocks, Components } = editor
  const type = 'products'
  const componentName = 'Products'
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
        traits: [...defaultTraits, ...productsTraits, ...defaultType.model.prototype.defaults.traits]
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

  // Create a block for the Products component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z"/></svg>',
    content: { type: type },
    category: 'Short Codes'
  })
}
