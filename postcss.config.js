const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')

const plugins = [
                  autoprefixer,
                  purgecss({
                    content: ['./dist/**/*.html'],
                    whitelist: ['active']
                  })
                ]

module.exports = {
  plugins
}
