import domtoimage from 'dom-to-image'
import { createPopper } from '@popperjs/core'
import loadComponents from './components'
import loadCommands from './commands'
import loadBlocks from './blocks'
import en from './locale/en'
import './styles/main.scss'

const dataDropdown = `
  <ul class="gjs-dropdown-menu">
    <li data-command="save-templates" class="gjs-menu-item">
      <i class="fa fa-save"></i>
      <span class="gjs-menu-label">Save template</span>
    </li>
    <li data-command="open-templates" class="gjs-menu-item">
      <i class="fa fa-folder-o"></i>
      <span class="gjs-menu-label">Load templates</span>
    </li>
  </ul>
`

export const makeThumbnail = (el, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataUrl = await domtoimage.toJpeg(el, options)
      resolve(dataUrl)
    } catch (error) {
      reject(error)
    }
  })
}

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {}
      // default options
    },
    ...opts
  }

  editor.makeThumbnail = makeThumbnail

  // Add components
  loadComponents(editor, options)

  // Add commands
  loadCommands(editor, options)

  // Add blocks
  loadBlocks(editor, options)
  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      ...options.i18n
    })

  const { Panels, $ } = editor

  Panels.addButton('options', {
    id: 'open-templates',
    className: 'dropdown fa fa-cog',
    attributes: {
      title: 'Template settings',
      'data-dropdown': dataDropdown,
      'data-offset': '-55,7'
    },
    togglable: false
  })

  // Append the dropdown menu to the document body
  const dropdownContainer = document.createElement('div')
  dropdownContainer.setAttribute('id', 'popper-container')
  document.body.appendChild(dropdownContainer)

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
