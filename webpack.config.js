// webpack.config.js

module.exports = function ({ config }) {
  return {
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  }
}
