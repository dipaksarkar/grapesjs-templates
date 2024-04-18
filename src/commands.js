import { modalContent, noItems, loader, mapTemplates, fetchTemplates, storeProjects, removeProjects, PROJECTS, TEMPLATES } from './utils'

const el = document.createElement('div')

export default (editor, options = {}) => {
  const { Commands, Modal, $ } = editor
  const $el = $(el)
  editor.tab = TEMPLATES

  const updateBtnEvent = () => {
    $el.find('.gjs-template-card .select').on('click', function () {
      const id = $(this).attr('data-template')
      const template = findTemplate(id, editor.tab)

      if (template?.data) editor.loadProjectData(template.data)

      Modal.close()
    })

    $el.find('.gjs-template-card .remove').on('click', function () {
      const id = $(this).attr('data-template')
      $(this).attr('disabled', true)
      removeProjects(id).then(() => {
        renderList(editor.tab)
      })
    })
  }

  const renderList = async (type = TEMPLATES) => {
    const id = `#${type}`
    $el.find(id).html(loader)

    const templates = (await fetchTemplates(type, options)) || editor[type] || []

    editor[type] = templates

    const html = mapTemplates(templates, type == PROJECTS)
    $el.find(id).html(templates.length ? html : noItems)

    setTimeout(() => {
      updateBtnEvent()
    }, 1)
  }

  const findTemplate = (id, type) => {
    const templates = editor[type]
    if (templates) {
      return templates?.find((item) => item.id == id)
    }
    return null
  }

  Commands.add('open-templates', {
    async run(editor, sender) {
      Modal.setTitle('Templates')
      Modal.setContent(el)
      Modal.open()

      $el.html(modalContent)

      await renderList()

      const tabPanel = $el.find('.gjs-tab')

      tabPanel.on('click', async function () {
        const tab = $(this).attr('data-tab')
        editor.tab = tab

        // switch active tab
        $el.find('.gjs-tab').attr('aria-selected', false)
        $(this).attr('aria-selected', true)
        $el.find('.gjs-tab')

        $el.find('.gjs-tab-panel').attr('aria-selected', false)
        $el.find(`#${tab}`).attr('aria-selected', true)

        // switch active tab-panel
        await renderList(tab)
      })
    }
  })

  Commands.add('save-templates', {
    async run(editor) {
      const name = prompt('Enter template name:')
      if (name) {
        const data = editor.getProjectData()
        const thumbnail = await editor.makeThumbnail(editor.getWrapper().getEl(), {
          quality: 0.5,
          height: 1000,
          cacheBust: true,
          style: {
            'background-color': 'white',
            ...editor.getWrapper().getStyle()
          }
        })
        return storeProjects({ id: Date.now(), data, name, thumbnail })
      }
    }
  })
}
