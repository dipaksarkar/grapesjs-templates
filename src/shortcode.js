import { isComponent } from './utils'

export default (editor, options = {}) => {
  const { onLoadShortCode } = options
  const { Components } = editor
  const type = 'shortcode'
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
        'custom-name': 'Shortcode',
        tagName: 'div',
        attributes: {
          class: type
        },
        removable: true, // Component can be removed
        draggable: true,
        droppable: false,
        editable: false, // Content is not editable
        content: `[${type}]`,
        traits: defaultType.model.prototype.defaults.traits
      },
      init() {
        this.handlePropChange()
      },
      handlePropChange() {
        const attributes = this.getShortCodeProps().join(' ')
        const shortcode = `[${type}${attributes ? ` ${attributes}` : ''}]`
        this.set('content', shortcode)
        this.set('shortcode', shortcode)
      },
      getShortCodeProps() {
        return this.get('traits')
          .filter((trait) => this.get(trait.id))
          .map((trait) => `${trait.id}="${this.get(trait.id)}"`)
      },
      getDataAttributes() {
        return this.get('traits')
          .filter((trait) => this.get(trait.id))
          .map((trait) => `data-${trait.id}="${this.get(trait.id)}"`)
      },
      toHTML() {
        const attributes = this.getDataAttributes().join(' ')
        const shortcode = this.get('shortcode')
        return `<div class="${type}" data-type="${type}" ${attributes}>${shortcode}</div>`
      }
    },
    view: {
      init({ model }) {
        model.get('traits').forEach((trait) => {
          this.listenTo(model, `change:${trait.id}`, this.handlePropChange)
        })
      },
      render() {
        const shortcode = this.model.get('shortcode')
        if (typeof onLoadShortCode === 'function') {
          onLoadShortCode(this.el, shortcode)
        } else {
          this.el.innerHTML = shortcode
        }
        return this
      },
      handlePropChange() {
        this.model.handlePropChange()
        this.render()
      }
    }
  })
}
