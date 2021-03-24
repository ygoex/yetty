const htmlmin = require("html-minifier");

module.exports = function htmlMinTransform(content, outputPath) {
  // If not production
  if (process.env.ELEVENTY_ENV !== 'production') {
    return content
  }
  // returned minified content from html files
  if (process.env.ELEVENTY_ENV === 'production' && outputPath.endsWith('.html')) {
    let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
    });
    return minified;
  }
  return content;
};
