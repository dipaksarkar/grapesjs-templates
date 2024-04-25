import { mapTemplates, fetchTemplates, storeProjects, removeProjects, PROJECTS, TEMPLATES } from './utils'

const el = document.createElement('div')

export default (editor, options = {}) => {
  const { Commands, Modal, $ } = editor
  const $el = $(el)
  editor.tab = TEMPLATES

  const modalContent = `
    <div class="manage-templates">
      <div class="gjs-px-md">
        <div class="gjs-tabs" role="tablist">
          <div class="gjs-tab" data-tab="${PROJECTS}" role="tab" aria-selected="false">
            <div class="gjs-tab__label">${editor.I18n.t('grapesjs-templates.projects')}</div>
            <div class="gjs-tab__indicator absolute-bottom"></div>
          </div>
          <div class="gjs-tab" data-tab="${TEMPLATES}" role="tab" aria-selected="true">
            <div class="gjs-tab__label">${editor.I18n.t('grapesjs-templates.templates')}</div>
            <div class="gjs-tab__indicator absolute-bottom"></div>
          </div>
        </div>
        <hr class="gjs-separator gjs-separator--horizontal gjs-separator--dark" aria-orientation="horizontal">
      </div>
      <div class="gjs-tab-panels">
        <div id="${PROJECTS}" aria-selected="false" class="gjs-tab-panel" role="tabpanel"></div>
        <div id="${TEMPLATES}" aria-selected="true" class="gjs-tab-panel" role="tabpanel"></div>
      </div>
    </div>
  `

  const noItems = `
    <div class="gjs-no-project">
      <i class="fa fa-newspaper-o"></i>
      <div class="gjs-message">
        ${editor.I18n.t('grapesjs-templates.no-records')}
      </div>
    </div>
  `

  const loader = `
    <div class="gjs-no-project">
      <div class="gjs-message">
        ${editor.I18n.t('grapesjs-templates.loading')}
      </div>
    </div>
  `

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
      removeProjects(id, options).then(() => {
        renderList(editor.tab)
      })
    })
  }

  const renderList = async (type = TEMPLATES) => {
    const id = `#${type}`
    $el.find(id).html(loader)

    const templates = (await fetchTemplates(type, options)) || editor[type] || []

    editor[type] = templates

    const html = mapTemplates(editor, templates, type == PROJECTS)
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
      Modal.setTitle(editor.I18n.t('grapesjs-templates.templates'))
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
      const name = prompt(editor.I18n.t('grapesjs-templates.enter-template-name'))
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
        return storeProjects({ id: Date.now(), data, name, thumbnail }, options)
      }
    }
  })
}
