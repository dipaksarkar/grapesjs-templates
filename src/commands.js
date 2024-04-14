export default (editor, options = {}) => {
  const { Commands } = editor

  Commands.add('open-pages', {
    run(editor) {
      editor.trigger('pages:open', options)
    }
  })

  Commands.add('open-templates', {
    run(editor) {
      editor.trigger('templates:open', options)
    }
  })
}
