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

export default (editor, options = {}) => {
  loadComponent(editor, { ...options, navbar })

  loadBlock(editor, { ...options, navbar })
}
