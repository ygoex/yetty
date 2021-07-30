const { DateTime } = require("luxon");
const fs = require("fs");
const slugify = require("slugify");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const CleanCSS = require("clean-css");
const criticalCss = require("eleventy-critical-css");
const pluginPWA = require("eleventy-plugin-pwa");
const imageShortcode = require('./utils/shortcodes/imageProcess.js');
const dateFilter = require("./utils/filters/dateFilter.js");
const imgSize = require("./utils/filters/imgSize.js");
const cacheBuster = require("./utils/filters/cacheBuster.js");
const tagList = require("./utils/collections/tagList.js");
const readingTime = require('eleventy-plugin-reading-time');
const mila = require('markdown-it-link-attributes');

// Import transforms
const htmlMinTransform = require("./utils/transforms/html-min-transform.js");

// Temporary get rid of warnings regarding the number of listeners
// TO-DO: Debug to find the resource leakage
process.setMaxListeners(15);

module.exports = function(eleventyConfig) {

  let env = process.env.ELEVENTY_ENV;

  /**
   * Add plugins
   *
   * @link https://www.11ty.dev/docs/plugins/
   */
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  // CriticalCSS
  if (env === 'production') {
    eleventyConfig.addPlugin(criticalCss, {
      height: 900,
      width: 1300,
    });
  }
  // PWA
  eleventyConfig.addPlugin(pluginPWA);
  eleventyConfig.addPlugin(readingTime);

  // Setup mermaid markdown highlighter
  const highlighter = eleventyConfig.markdownHighlighter;
  eleventyConfig.addMarkdownHighlighter((str, language) => {
    if (language === 'mermaid') {
      return `<pre class="mermaid">${str}</pre>`;
    }
    return highlighter(str, language);
  });

  /**
   * Opts in to a full deep merge when combining the Data Cascade.
   *
   * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
   */
  eleventyConfig.setDataDeepMerge(true);

  /**
   * Add layout aliases
   *
   * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
   */
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  /**
   * Add filters
   *
   * @link https://www.11ty.io/docs/filters/
   */
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('dateStringISO', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("dateFilter", dateFilter);
  eleventyConfig.addFilter("imgSize", imgSize);
  eleventyConfig.addFilter("cacheBuster", cacheBuster);

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Minify inline style
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Customize slugify: makes everything lowercase,
  // replaces - with _, and strips unsafe chars from URLs
  eleventyConfig.addFilter("slug", (str) => {
    return slugify(str, {
      lower: true,
      replacement: "_",
      remove: /[*+~·,()'"`´%!?¿:@\/]/g,
    });
  });

  /**
   * Add shortcodes
   *
   * @link https://www.11ty.dev/docs/shortcodes/
   */

  // Insert current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("today", () => `${new Date()}`);

  // Responsive images with two shortcodes, one synchronous and another asynchronous: https://github.com/11ty/eleventy-plugin-vue/issues/12
  // Universal Shortcodes (Adds to Liquid, Nunjucks, Md, etc) are synchronous.
  eleventyConfig.addShortcode("imageMd", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imageNjk", imageShortcode);

  /**
   * Add Transforms
   *
   * @link https://www.11ty.io/docs/config/#transforms
   */

  // Minify html
  eleventyConfig.addTransform("htmlmin", htmlMinTransform);

  /**
   * Add Collections
   *
   * @link https://www.11ty.io/docs/collections
   */
  eleventyConfig.addCollection("tagList", tagList);

  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/styles/*.css");
  eleventyConfig.addPassthroughCopy({"node_modules/mermaid/dist/mermaid.min.js": "/assets/scripts/vendors/mermaid.min.js"});
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/manifest.json");
  eleventyConfig.addPassthroughCopy("./src/assets/scripts/vendors/modernizr.min.js");
  if (env === 'production') {
    eleventyConfig.addPassthroughCopy("./src/assets/scripts/bundle.min.js");
  } else {
    eleventyConfig.addPassthroughCopy("./src/assets/styles/*.map");
    eleventyConfig.addPassthroughCopy("./src/assets/scripts/index.js");
  };

  /**
   * Set custom markdown library instance
   *
   * @link https://www.11ty.dev/docs/languages/liquid/#optional-set-your-own-library-instance
   */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  .use(mila, {
    pattern: /^(?!(https:\/\/yetty\.netlify\.app|#)).*$/gm,
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  })
  .use(markdownItAnchor, {
    // Options with v8.1 for accessibility
    permalink: markdownItAnchor.permalink.linkAfterHeader({
      class: "direct-link",
      symbol: "",
      style: 'visually-hidden',
      assistiveText: title => `Permalink to “${title}”`,
      visuallyHiddenClass: 'visually-hidden'
    }),
    slugify: (s) =>
      s
        .trim()
        .toLowerCase()
        .replace(/[\s+~\/]/g, "_")
        .replace(/[().`,%·'"!?¿:@*]/g, ""),
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  /**
   * Watch files that will trigger hot reload at localhost:8080
   *
   * @link https://www.11ty.dev/docs/watch-serve/
   */
  // Watch JS
  eleventyConfig.addWatchTarget('./src/assets/scripts/index.js');
  eleventyConfig.addWatchTarget('./src/assets/styles/main.css');

  /**
   * Override BrowserSync Server options
   *
   * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
   */
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('./dist/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "./src",
      includes: "_includes",
      data: "_data",
      output: "./dist"
    }
  };
};
