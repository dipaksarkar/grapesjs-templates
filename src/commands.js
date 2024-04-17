const el = document.createElement('div')
const modalContent = `
  <div class="manage-templates">
    <div class="gjs-px-md">
      <div class="gjs-tabs" role="tablist">
        <div class="gjs-tab" data-tab="projects" role="tab" aria-selected="false">
          <div class="gjs-tab__label">My projects</div>
          <div class="gjs-tab__indicator absolute-bottom"></div>
        </div>
        <div class="gjs-tab" data-tab="templates" role="tab" aria-selected="true">
          <div class="gjs-tab__label">Templates</div>
          <div class="gjs-tab__indicator absolute-bottom"></div>
        </div>
      </div>
      <hr class="gjs-separator gjs-separator--horizontal gjs-separator--dark" aria-orientation="horizontal">
    </div>
    <div class="gjs-tab-panels">
      <div id="templates" aria-selected="true" class="gjs-tab-panel" role="tabpanel"></div>
      <div id="projects" aria-selected="false" class="gjs-tab-panel" role="tabpanel"></div>
    </div>
  </div>
`
const noItems = `
  <div class="gjs-no-project">
    <i class="fa fa-newspaper-o"></i>
    <div class="gjs-message">
      No projects found. Projects will appear here once you add them.
    </div>
  </div>
`

export default (editor, options = {}) => {
  const { Commands, Modal, $ } = editor
  const $el = $(el)

  const renderList = (type = 'templates') => {
    const id = `#${type}`
    const templates = editor[type] || []

    const list = templates.map(
      (item) => `
        <div class="gjs-xs-12 gjs-sm-4">
          <div class="template-card">
            <div class="gjs-img gjs-img--menu" role="img">
              <img src="${item.thumbnail}">
            </div>
            <hr class="gjs-separator gjs-separator--horizontal" aria-orientation="horizontal">
            <div class="gjs-card__section gjs-card__section--vert">
              <div class="gjs-text-subtitle2">${item.name}</div>
            </div>
            <div class="controller">
              <button data-type="templates" data-template="${item.id}">Select</button>
            </div>
          </div>
        </div>
      `
    )
    const html = `<div class="templates gjs-row gjs-col-gutter-md">${list.join('')}</div>`
    $el.find(id).html(templates.length ? html : noItems)
  }

  const findTemplate = (id, type) => {
    const templates = editor[type]
    if (templates) {
      return templates?.find((item) => item.id == id)
    }
    return null
  }

  Commands.add('open-templates', {
    run(editor, sender) {
      Modal.setTitle('Templates')
      Modal.setContent(el)
      Modal.open()

      $el.html(modalContent)

      renderList()

      const tabPanel = $el.find('.gjs-tab')
      const actionBtn = $el.find('.template-card button')

      tabPanel.on('click', function () {
        const tab = $(this).attr('data-tab')

        // switch active tab
        $el.find('.gjs-tab').attr('aria-selected', false)
        $(this).attr('aria-selected', true)
        $el.find('.gjs-tab')

        // switch active tab-panel
        renderList(tab)
        $el.find('.gjs-tab-panel').attr('aria-selected', false)
        $el.find(`#${tab}`).attr('aria-selected', true)
      })

      actionBtn.on('click', function () {
        const type = $(this).attr('data-type')
        const id = $(this).attr('data-template')
        const template = findTemplate(id, type)
        if (template?.data) {
          editor.loadProjectData(template.data)
        }
        Modal.close()
      })
    }
  })

  Commands.add('save-templates', {
    run(editor) {
      editor.trigger('templates:save', options)
    }
  })
}
