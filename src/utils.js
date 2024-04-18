export const dropdownMenu = `
  <ul class="gjs-dropdown-menu">
    <li data-command="save-templates" class="gjs-menu-item">
      <i class="fa fa-save"></i>
      <span class="gjs-menu-label">Save template</span>
    </li>
    <li data-command="open-templates" class="gjs-menu-item">
      <i class="fa fa-folder-o"></i>
      <span class="gjs-menu-label">Load templates</span>
    </li>
  </ul>
`

export const modalContent = `
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
export const noItems = `
  <div class="gjs-no-project">
    <i class="fa fa-newspaper-o"></i>
    <div class="gjs-message">
      No projects found. Projects will appear here once you add them.
    </div>
  </div>
`

export const mapTemplates = (templates) => {
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
  return `<div class="templates gjs-row gjs-col-gutter-md">${list.join('')}</div>`
}
