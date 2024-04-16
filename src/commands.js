export default (editor, options = {}) => {
  const { Commands } = editor

  Commands.add('open-templates', {
    run(editor) {
      editor.trigger('templates:open', options)
    }
  })

  Commands.add('save-templates', {
    run(editor) {
      editor.trigger('templates:save', options)
    }
  })
}
