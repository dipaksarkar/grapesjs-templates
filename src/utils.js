export const PROJECTS_KEY = 'gjs-projects'

export const PROJECTS = 'projects'

export const TEMPLATES = 'templates'

export const thumbnail = 'https://raw.githubusercontent.com/dipaksarkar/grapesjs-pages/main/assets/placeholder.png'

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
        <div class="gjs-tab" data-tab="${PROJECTS}" role="tab" aria-selected="false">
          <div class="gjs-tab__label">My projects</div>
          <div class="gjs-tab__indicator absolute-bottom"></div>
        </div>
        <div class="gjs-tab" data-tab="${TEMPLATES}" role="tab" aria-selected="true">
          <div class="gjs-tab__label">Templates</div>
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

export const noItems = `
  <div class="gjs-no-project">
    <i class="fa fa-newspaper-o"></i>
    <div class="gjs-message">
      No projects found. Projects will appear here once you add them.
    </div>
  </div>
`

export const loader = `
  <div class="gjs-no-project">
    <div class="gjs-message">
      Loading...
    </div>
  </div>
`

export const mapTemplates = (templates, removeable = false) => {
  const list = templates.map(
    (item) => `
      <div class="gjs-xs-12 gjs-sm-4">
        <div class="gjs-template-card">
          <div class="gjs-thumbnail gjs-img gjs-img--menu" role="img">
            <img src="${item?.thumbnail || thumbnail}">
            <div class="gjs-controller">
              <button class="select" data-template="${item.id}">Select</button>
            </div>
          </div>
          <hr class="gjs-separator gjs-separator--horizontal" aria-orientation="horizontal">
          <div class="gjs-card__section gjs-card__section--vert">
            <div class="gjs-text-subtitle2">${item.name}</div>
            ${removeable ? `<button data-template="${item.id}" class="gjs-btn-delete remove fa fa-trash"></button>` : ''}
          </div>
        </div>
      </div>
    `
  )
  return `<div class="gjs-templates gjs-row gjs-col-gutter-md">${list.join('')}</div>`
}

const loadProjects = () => {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY))
  } catch (error) {
    return null
  }
}

export const storeProjects = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      const projects = loadProjects() || []
      projects.push(payload)
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
      resolve(projects)
    } catch (error) {
      reject(error)
    }
  })
}

export const removeProjects = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      const projects = loadProjects() || []
      const results = projects.filter((item) => item.id != payload)
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(results))
      resolve(results)
    } catch (error) {
      reject(error)
    }
  })
}

export const fetchTemplates = (type, options) => {
  return new Promise(async (resolve) => {
    const requestOptions = {
      method: 'GET',
      headers: options?.headers || [],
      redirect: 'follow'
    }

    let apiEndpoint = options?.templates
    let results = []
    const onLoad = options?.onLoad

    if (typeof onLoad == 'function') {
      try {
        results = await onLoad(type)
        return resolve(results)
      } catch (error) {
        console.error(error)
        return resolve(null)
      }
    }

    if (type == PROJECTS) apiEndpoint = options?.projects

    if (!apiEndpoint) {
      if (type == PROJECTS) {
        return resolve(loadProjects())
      }
      return resolve(null)
    }

    fetch(apiEndpoint, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return resolve(result)
      })
      .catch((error) => {
        console.error(error)
        return resolve(null)
      })
  })
}
