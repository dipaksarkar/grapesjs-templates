import loadComponent from './component'
import loadBlock from './block'

export const navbar = {
  id: 'navbar',
  label: 'Navbar',
  block: {},
  style: '',
  styleAdditional: '',
  classPrefix: 'navbar'
}

export const loadNavbarBlock = (editor, opts = {}) => {
  loadBlock(editor, { ...opts, navbar })
}

export const loadNavbarComponent = (editor, opts = {}) => {
  loadComponent(editor, { ...opts, navbar })
}
