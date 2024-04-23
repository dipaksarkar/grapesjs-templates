const path = require('path')

module.exports = function ({ config }) {
  return {
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime', // Plugin for async/await
                '@babel/plugin-transform-regenerator' // Plugin for async/await
              ]
            }
          }
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  }
}
