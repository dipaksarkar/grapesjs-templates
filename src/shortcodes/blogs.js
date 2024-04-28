import { defaultTraits, isComponent } from '../utils'

export default (editor, options = {}) => {
  const { blogsTraits } = options
  const { Blocks, Components } = editor
  const type = 'blogs'
  const componentName = 'Blogs'
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
        traits: [...defaultTraits, ...blogsTraits, ...defaultType.model.prototype.defaults.traits]
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

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',
    content: { type: type },
    category: 'Short Codes'
  })
}
