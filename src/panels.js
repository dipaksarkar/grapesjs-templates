import { dropdownMenu } from './utils'

export default (editor, opts = {}) => {
  const { Panels, $, createPopper } = editor

  Panels.addButton('options', {
    id: 'open-templates',
    className: 'dropdown fa fa-cog',
    attributes: {
      title: 'Template settings',
      'data-dropdown': dropdownMenu,
      'data-offset': '-55,7'
    },
    togglable: false
  })

  // Append the dropdown menu to the document body
  const popperEl = document.createElement('div')
  popperEl.setAttribute('id', 'popper-container')
  document.body.appendChild(popperEl)

  $(document).ready(() => {
    let active = false
    const container = $('#popper-container')

    $('.dropdown').click(function ({ target }) {
      const dropdown = $(this).attr('data-dropdown')
      const elOffset = $(this).attr('data-offset')
      let offset = [0, 0]

      if (elOffset) {
        offset = elOffset.split(',').map((item) => parseFloat(item))
      }

      container.html(dropdown)
      const popperInstance = createPopper(target, container[0], {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: offset
            }
          }
        ]
      })

      active = !active
      container.attr('data-show', active)

      // We need to tell Popper to update the container position
      // after we show the container, otherwise it will be incorrect
      popperInstance.update()
    })

    container.on('click', '.gjs-menu-item', function () {
      const command = $(this).attr('data-command')
      active = false
      container.attr('data-show', active)
      if (command) {
        editor.runCommand(command)
      }
    })

    // Event listener to hide dropdown when clicking outside of it
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.dropdown').length && !$(event.target).closest('#popper-container').length) {
        active = false
        container.attr('data-show', active)
      }
    })
  })
}
