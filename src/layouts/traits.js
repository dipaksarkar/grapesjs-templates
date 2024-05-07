export default (editor, config = {}) => {
  const { TraitManager } = editor

  // Define the new trait type 'select-class'
  TraitManager.addType('select-class', {
    events: {
      change: 'onChange'
    },
    createInput({ trait }) {
      const md = this.model
      const opts = md.get('options') || []
      const input = document.createElement('select')
      const classList = Array.from(this.target.view.el.classList)

      for (let i = 0; i < opts.length; i++) {
        const option = document.createElement('option')
        option.text = opts[i].label
        option.value = opts[i].id

        if (classList.includes(opts[i].id)) {
          option.setAttribute('selected', 'selected')
        }

        input.append(option)
      }

      return input
    },
    onUpdate({ elInput, component }) {
      // No specific update needed for this trait
    },
    onEvent({ elInput, component, event }) {
      const classes = this.model.get('options').map((opt) => opt.id)

      // Remove all classes listed in the options from the component
      classes.forEach((cls) => component.removeClass(cls))

      // Add the currently selected class to the component
      const value = this.model.get('value')
      if (value) {
        component.addClass(value)
      }
    }
  })
}
