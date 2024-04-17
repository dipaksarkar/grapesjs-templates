const el = document.createElement('div')

export default (editor, options = {}) => {
  const { Commands, Modal, $ } = editor

  Commands.add('open-templates', {
    run(editor, sender) {
      Modal.setTitle('Templates')
      Modal.setContent(el)
      Modal.open()

      $(el).html(`
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
              <div id="templates" aria-selected="true" class="gjs-tab-panel" role="tabpanel">
                  <div class="templates row gjs-col-gutter-md">
                      <div class="col-xs-12 col-sm-4">
                          <div class="template-card">
                              <div class="gjs-img gjs-img--menu" role="img">
                                  <img
                                      src="https://raw.githubusercontent.com/coders-tm/quasar-app-extension-qhtmlbuilder/main/images/thumbnail-1.jpg">
                              </div>
                              <hr class="gjs-separator gjs-separator--horizontal" aria-orientation="horizontal">
                              <div class="gjs-card__section gjs-card__section--vert">
                                  <div class="text-subtitle2">Landing Page</div>
                              </div>
                              <div class="controller">
                                  <button data-type="templates" data-template="1">Select</button>
                              </div>
                          </div>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                          <div class="template-card">
                              <div class="gjs-img gjs-img--menu" role="img">
                                  <img
                                      src="https://raw.githubusercontent.com/coders-tm/quasar-app-extension-qhtmlbuilder/main/images/thumbnail-1.jpg">
                              </div>
                              <hr class="gjs-separator gjs-separator--horizontal" aria-orientation="horizontal">
                              <div class="gjs-card__section gjs-card__section--vert">
                                  <div class="text-subtitle2">Landing Page</div>
                              </div>
                              <div class="controller">
                                  <button data-type="templates" data-template="2">Select</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div id="projects" aria-selected="false" class="gjs-tab-panel" role="tabpanel">
                  <div class="gjs-no-project">
                      <i class="fa fa-newspaper-o"></i>
                      <div class="gjs-message">
                          No projects found. Projects will appear here once you add them.
                      </div>
                  </div>
              </div>
          </div>
        </div>
      `)

      $(el)
        .find('.gjs-tab')
        .on('click', function () {
          // switch active tab
          $(el).find('.gjs-tab').attr('aria-selected', false)
          $(this).attr('aria-selected', true)
          $(el).find('.gjs-tab')

          // switch active tab-panel
          $(el).find('.gjs-tab-panel').attr('aria-selected', false)
          $(el)
            .find('#' + $(this).attr('data-tab'))
            .attr('aria-selected', true)
        })

      $(el)
        .find('.template-card button')
        .on('click', function () {
          const type = $(this).attr('data-type')
          const template = $(this).attr('data-template')
          console.log(type, template)
        })
    }
  })

  Commands.add('save-templates', {
    run(editor) {
      editor.trigger('templates:save', options)
    }
  })
}
