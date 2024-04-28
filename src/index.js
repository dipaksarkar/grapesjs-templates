import domtoimage from 'dom-to-image'
import { createPopper } from '@popperjs/core'
import loadNavBar from './navbar'
import loadCommands from './commands'
import loadPanels from './panels'
import en from './locale/en'
import templates from './templates'
import loadShortCode from './shortcode'
import loadShortCodes from './shortcodes'

import './styles/main.scss'

export const makeThumbnail = (el, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataUrl = await domtoimage.toJpeg(el, options)
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
      projects: null,
      announcementsTraits: [],
      blogsTraits: [],
      productsTraits: [],
      plansTratis: [],
      schedulesTraits: [],
      openingTimesTraits: [],
      contactForms: [],
      contactFormsTraits: []
    },
    ...opts
  }

  // Load i18n files
  if (editor.I18n) {
    editor.I18n.addMessages({
      en,
      ...options.i18n
    })
  }

  editor.templates = templates
  editor.makeThumbnail = makeThumbnail
  editor.createPopper = createPopper

  // Add components
  loadNavBar(editor, options)

  // Add commands
  loadCommands(editor, options)

  // Add panels
  loadPanels(editor, options)

  // Add Short Code
  loadShortCode(editor, options)

  // Load Short Codes
  loadShortCodes(editor, options)
}
