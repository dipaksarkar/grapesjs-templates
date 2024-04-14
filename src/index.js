import domtoimage from 'dom-to-image'
import loadComponents from './components'
import loadCommands from './commands'
import loadBlocks from './blocks'
import en from './locale/en'

export const generateThumbnail = (el, options = {}) => {
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

  editor.domtoimage = domtoimage

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

  const { Panels } = editor

  Panels.addButton('options', {
    id: 'open-templates',
    className: 'fa fa-folder-o',
    attributes: {
      title: 'Open Templates'
    },
    command: 'open-templates',
    togglable: false
  })

  Panels.addButton('options', {
    id: 'open-pages',
    label:
      '<svg style="width: 18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>',
    attributes: {
      title: 'Open Pages'
    },
    command: 'open-pages',
    togglable: false
  })
}
