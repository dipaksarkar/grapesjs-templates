export default (editor, opts = {}) => {
  const { Panels, $, createPopper } = editor

  const dropdownMenu = `
    <ul data-offset="-55,15" class="gjs-dropdown-menu">
      <li data-command="save-templates" class="gjs-menu-item">
        <i class="fa fa-save"></i>
        <span class="gjs-menu-label">${editor.I18n.t('grapesjs-templates.save-template')}</span>
      </li>
      <li data-command="open-templates" class="gjs-menu-item">
        <i class="fa fa-folder-o"></i>
        <span class="gjs-menu-label">${editor.I18n.t('grapesjs-templates.load-template')}</span>
      </li>
    </ul>
  `

  Panels.addButton('options', {
    id: 'open-templates',
    label:
      '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"></path></svg>' +
      dropdownMenu,
    className: 'gjs-dropdown',
    attributes: {
      title: editor.I18n.t('grapesjs-templates.template-settings')
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

    $('.gjs-dropdown').click(function ({ target }) {
      const dropdown = $(this).find('.gjs-dropdown-menu')
      const elOffset = dropdown.attr('data-offset')
      let offset = [0, 0]

      if (elOffset) {
        offset = elOffset.split(',').map((item) => parseFloat(item))
      }

      container.html(dropdown.prop('outerHTML'))
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
      if (!$(event.target).closest('.gjs-dropdown').length && !$(event.target).closest('#popper-container').length) {
        active = false
        container.attr('data-show', active)
      }
    })
  })
}
