import domtoimage from 'dom-to-image'
import { createPopper } from '@popperjs/core'
import loadComponents from './components'
import loadCommands from './commands'
import loadBlocks from './blocks'
import loadPanels from './panels'
import en from './locale/en'
import templates from './templates'

import './styles/main.scss'

export const makeThumbnail = (el, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataUrl = await domtoimage.toJpeg(el, options)
      console.log(dataUrl)
      resolve(dataUrl)
    } catch (error) {
      console.error(error)
      resolve(null)
    }
  })
}

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      templates: null,
      projects: null
    },
    ...opts
  }

  editor.templates = templates
  editor.makeThumbnail = makeThumbnail
  editor.createPopper = createPopper

  // Add components
  loadComponents(editor, options)

  // Add commands
  loadCommands(editor, options)

  // Add blocks
  loadBlocks(editor, options)

  // Add panels
  loadPanels(editor, options)

  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      ...options.i18n
    })
}
