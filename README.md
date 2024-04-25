# Grapesjs Templates
Simple projects and templates manage plugin for GrapesJS

[![npm Version](https://badgen.net/npm/v/grapesjs-templates?color=green)](https://www.npmjs.com/package/grapesjs-templates)
[![npm Downloads](https://badgen.net/npm/dt/grapesjs-templates?color=green)](https://www.npmjs.com/package/grapesjs-templates)
[![github Stars](https://badgen.net/github/stars/dipaksarkar/grapesjs-templates?color=green)](https://www.npmjs.com/package/grapesjs-templates)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/grapesjs-templates?color=green)](https://bundlephobia.com/result?p=grapesjs-templates)
[![License](https://badgen.net/github/license/dipaksarkar/grapesjs-templates?color=green)](https://github.com/dipaksarkar/grapesjs-templates/blob/master/LICENSE)


<p align="center" width="100%">
<img src="assets/preview.gif"  style="max-width: 100%;display: inline-block;border-radius: 6px;overflow: hidden;">
</p>

[DEMO](https://jsfiddle.net/dipaksarkar/wq1zbLpm/)


### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-templates"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['grapesjs-templates'],
  pluginsOpts: {
    'grapesjs-templates': { 
      templates: 'http://localhost:3000/templates',
      projects: 'http://localhost:3000/projects',
    }
  }
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```


## Summary

Plugin name: `grapesjs-templates`

## Options

| Option      | Description                            | Default       |
|-------------|----------------------------------------|---------------|
| `templates` | API endpoint for templates.             | `null`        |
| `projects`  | API endpoint for projects.              | `null`        |
| `onLoad`    | Method to load projects or templates.  | `undefined`   |
| `onStore`   | Method to store data.                   | `undefined`   |
| `onDelete`  | Method to delete a project.            | `undefined`   |

Let me know if you need further assistance!

## Option Details

- **`templates`:** 
  - Type: `String` or `null`
  - Description: API endpoint for templates.
  - Default: `null`

- **`projects`:**
  - Type: `String` or `null`
  - Description: API endpoint for projects.
  - Default: `null`

- **`onLoad`:**
  - Type: `Function`
  - Description: Method to load projects or templates.
  - Default: `undefined`
  - Parameters:
    - `type` (String): Type of data to load (`templates` or `projects`).
  - Returns:
    - `Array` or `null`: Array of loaded data or null if not found.

- **`onStore`:**
  - Type: `Function`
  - Description: Method to store data.
  - Default: `undefined`
  - Parameters:
    - `payload` (Object): Data to be stored.
  - Returns:
    - `Boolean`: `true` if stored successfully, `false` otherwise.

- **`onDelete`:**
  - Type: `Function`
  - Description: Method to delete a project.
  - Default: `undefined`
  - Parameters:
    - `id` (String): ID of the project to delete.
  - Returns:
    - `Boolean`: `true` if deletion is successful, `false` otherwise.


## Download

* CDN
  * `https://unpkg.com/grapesjs-templates`
* NPM
  * `npm i grapesjs-templates`
* GIT
  * `git clone https://github.com/dipaksarkar/grapesjs-templates.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-templates.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-templates'],
      pluginsOpts: {
        'grapesjs-templates': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-templates';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/dipaksarkar/grapesjs-templates.git
$ cd grapesjs-templates
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
