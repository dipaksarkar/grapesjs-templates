import { loadNavbarBlock } from './navbar'
import { isComponent } from './utils'

export default (editor, opts = {}) => {
  loadNavbarBlock(editor, opts)
  const { contactForms } = opts
  const { Blocks, Components } = editor
  const type = 'contact-form'

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => {
      if (isComponent(el, type)) {
        return { type: type }
      }
    },
    model: {
      defaults: {
        'custom-name': 'Contact Form',
        tagName: 'div',
        attributes: {
          class: type
        },
        removable: true, // Component can be removed
        draggable: true,
        droppable: false,
        editable: false, // Content is not editable
        content: `[${type}]`,
        traits: [
          {
            type: 'select',
            name: 'form',
            label: 'From',
            changeProp: 1,
            options: contactForms
          }
        ]
      },
      init() {
        this.handlePropChange()
      },
      handlePropChange() {
        const form = this.get('form')
        const shortcode = `[${type}${form ? ` form="${form}"` : ''}]`
        this.set('content', shortcode)
        this.set('shortcode', shortcode)
      },
      toHTML() {
        return `<div class="${type}" data-type="${type}" data-form="${this.get('form')}">${this.get('shortcode')}</div>`
      }
    },
    view: {
      init() {
        this.listenTo(this.model, 'change:content', this.render)
        this.listenTo(this.model, 'change:form', this.handleFormChange)
      },
      render() {
        const from1 = `
          <form action="hhh" method="get">
            <input type="text" placeholder="Type...">
            <input type="button" value="Submit">
          </form>
        `

        const from2 = `
          <form action="hhh" method="get">
            <input type="email" placeholder="example@mail.com">
            <input type="password" placeholder="********">
            <input type="button" value="Submit">
          </form>
        `

        const from = this.model.get('form')

        this.el.innerHTML = from == 1000 ? from1 : from2
        return this
      },
      handleFormChange() {
        this.model.handlePropChange()
      },
      onRender() {
        // Check if the component has a data-form attribute
        const dataForm = this.model.get('attributes')['data-form']
        console.log(this)
        if (dataForm) {
          // Set the form trait based on the data-form attribute
          this.model.set('form', dataForm)
        }
      }
    }
  })

  // Create a block for the contact form component
  Blocks.add('contact-form-block', {
    label: 'Contact Form',
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm64 32v64c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 320c-13.3 0-24 10.7-24 24s10.7 24 24 24h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H80zm136 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H216z"/></svg>',
    content: { type: type }
  })
}
