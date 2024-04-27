export const PROJECTS_KEY = 'gjs-projects'

export const PROJECTS = 'projects'

export const TEMPLATES = 'templates'

export const thumbnail = 'https://raw.githubusercontent.com/dipaksarkar/grapesjs-templates/main/assets/placeholder.png'

export const isComponent = (el, type) => {
  return el && ((el.dataset && el.dataset.type === type) || (el.classList && el.classList.contains(type)))
}

export const mapTemplates = (editor, templates, removeable = false) => {
  const list = templates.map(
    (item) => `
      <div class="gjs-xs-12 gjs-sm-4">
        <div class="gjs-template-card">
          <div class="gjs-thumbnail gjs-img gjs-img--menu" role="img">
            <img src="${item?.thumbnail || thumbnail}">
            <div class="gjs-controller">
              <button class="select" data-template="${item.id}">${editor.I18n.t('grapesjs-templates.select')}</button>
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

export const storeProjects = (payload, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (opts?.projects) {
        fetch(opts.projects, {
          method: 'POST',
          headers: opts?.headers || [],
          body: JSON.stringify(payload),
          redirect: 'follow'
        })
          .then((response) => response.json())
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      } else if (typeof opts?.onStore == 'function') {
        try {
          const results = await opts.onStore(payload)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      } else {
        const projects = loadProjects() || []
        projects.push(payload)
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
        resolve(true)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const removeProjects = (payload, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (opts?.projects) {
        fetch(`${opts.projects}/${payload}`, {
          method: 'DELETE',
          headers: opts?.headers || [],
          redirect: 'follow'
        })
          .then((response) => response.json())
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      } else if (typeof opts?.onDelete == 'function') {
        try {
          const results = await opts.onDelete(payload)
          resolve(results)
        } catch (error) {
          reject(error)
        }
      } else {
        const projects = loadProjects() || []
        const results = projects.filter((item) => item.id != payload)
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(results))
        resolve(true)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const fetchTemplates = (type, opts) => {
  return new Promise(async (resolve) => {
    const requestopts = {
      method: 'GET',
      headers: opts?.headers || [],
      redirect: 'follow'
    }

    let apiEndpoint = opts?.templates
    let results = []
    const onLoad = opts?.onLoad

    if (typeof onLoad == 'function') {
      try {
        results = await onLoad(type)
        return resolve(results)
      } catch (error) {
        console.error(error)
        return resolve(null)
      }
    }

    if (type == PROJECTS) apiEndpoint = opts?.projects

    if (!apiEndpoint) {
      if (type == PROJECTS) {
        return resolve(loadProjects())
      }
      return resolve(null)
    }

    fetch(apiEndpoint, requestopts)
      .then((response) => response.json())
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        console.error(error)
        resolve(null)
      })
  })
}
