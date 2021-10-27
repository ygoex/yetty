# yetty: Yet another Eleventy starter kit for my (& your) new projects. Built with accessibility and performance in mind.

<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/faab84cf-52cb-4150-b142-f0c4e0e5312f/deploy-status)](https://app.netlify.com/sites/yetty/deploys) -->

![Netlify-build](https://img.shields.io/netlify/faab84cf-52cb-4150-b142-f0c4e0e5312f?style=for-the-badge)
![GitHub-license](https://img.shields.io/github/license/ygoex/yetty?style=for-the-badge)
![GitHub-stars](https://img.shields.io/github/stars/ygoex/yetty?style=for-the-badge)
![GitHub-forks](https://img.shields.io/github/forks/ygoex/yetty?style=for-the-badge)

![Yetty](https://github.com/ygoex/yetty/blob/main/src/assets/images/yetty-social.jpg?raw=true)

## Features:
- [Sass/Scss](https://github.com/sass/node-sass): Scss files are compiled before Eleventy builds the site. The files are compiled in the `./src/styles` folder and then will be passed through copy (see `.eleventy.js`) to the new site created under `./dist/`. For Netlify users, an alternative option with plugins is explained here: [https://css-tricks.com/making-my-netlify-build-run-sass/](https://css-tricks.com/making-my-netlify-build-run-sass/).
- [Critical CSS](https://github.com/gregives/eleventy-critical-css): Critical CSS is automatically included in the head of the document using the [eleventy-critical-css plugin](https://www.npmjs.com/package/eleventy-critical-css).
- PostCSS ([Autoprefixer](https://github.com/postcss/autoprefixer) and [PurgeCSS](https://github.com/FullHuman/purgecss)): Both dependencies have been set up to run through the main css stylesheet after Eleventy has generated the dist folder.
- Persistent dark mode using local storage as seen here: [https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- Cache busting via filter based on [https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/](https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/).
- HTML minified on prooduction with [https://www.npmjs.com/package/html-minifier](https://www.npmjs.com/package/html-minifier) package.
- PWA using [https://github.com/okitavera/eleventy-plugin-pwa](https://github.com/okitavera/eleventy-plugin-pwa) plugin.
- JS compilation and minification with [Webpack](https://webpack.js.org/) CLI.
- Image processing with [eleventy-img](https://github.com/11ty/eleventy-img) plugin. Generates multiple sizes images in two different formats (jpg and webp), and markup with `<figure>`, `<picture>` and native lazy loading.
- [Modernizr](https://modernizr.com/) CLI: To build a custom and minified version of the library as seen here: [https://v2.14islands.com/blog/2016/04/20/better-way-to-use-modernizr-with-command-line-config/](https://v2.14islands.com/blog/2016/04/20/better-way-to-use-modernizr-with-command-line-config/). Yetty is using it to detect if the browser supports Webp as background-image in CSS.

## TO-DO:
- [ ] Improve documentation
- [ ] Testing with Cypress

## Demo

* [yetty](https://yetty.netlify.app/)

## Deploy this to your own site

This builder is amazing. Try it out to get your own yetty site in a few clicks!

* [Get your own yetty web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/ygoex/yetty)

## Requirements

- [Node.js v10 or higher](https://nodejs.org/en/download/) must be installed to run this program.
- [npm 7.20.0 or higher](https://www.npmjs.com/package/npm) must be also installed.

## Getting Started

### 1. Clone this Repository

```
git clone https://github.com/ygoex/yetty.git my-new-project
```
or, if you are currently signed in to GitHub, [generate a repo from this template](https://github.com/ygoex/yetty/generate).


### 2. Navigate to the directory

```
cd my-new-project
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json and adjust the values to your details.

### 5. Run Eleventy

For local development:
```
npm start
```

To build a production version:
```
npm run build
```

For debug mode:
```
DEBUG=* npx eleventy
```

### Implementation Notes

* `about/index.md` shows how to add a new content page.
* `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
* Add the `nav` tag to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
* The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
* This example uses three layouts:
  * `_includes/layouts/base.njk`: the top level HTML structure
  * `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  * `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
* `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.

## Other features you might require:

- **Inline CSS**: If you require further control over the above the fold & common style inlined by CriticalCSS, you can inline the style manually as follows:

    1. Add the following code between the head tags in the `base.njk` file:

        ```
        {% set css %}
          {% include "inline_style/inline_style.css" %}
        {% endset %}
        <style>
          {{css | cssmin | safe}}
        </style>
        ```
    2. Create a scss file with the name `inline_style.scss` under `_includes/inline_style/scss/inline_style.scss`

    3. Add the following command to the beginning of the **sass:prod** script in `package.json`:

        ```
        node-sass src/_includes/inline_style/scss/ --output src/_includes/inline_style/ --output-style compressed &&
        ```

        And also, the following command to the beginning of the **sass:dev** script:

        ```
        node-sass src/_includes/inline_style/scss/ --output src/_includes/inline_style/ --source-map true --source-map-contents true &&
        ```

  For additional documentation about how to inline css in Eleventy visit:

    1. [https://www.11ty.dev/docs/quicktips/inline-css/](https://www.11ty.dev/docs/quicktips/inline-css/)
    2. [https://www.11ty.dev/docs/quicktips/concatenate/](https://www.11ty.dev/docs/quicktips/concatenate/)
    3. [https://danabyerly.com/articles/manually-splitting-css-files-in-eleventy/](https://danabyerly.com/articles/manually-splitting-css-files-in-eleventy/)

---

This starter kit was born as a fork of [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog), but it also includes features inspired by other Eleventy projects:

- [Eleventy Solo](https://github.com/brycewray/eleventy_solo)
- [Eleventy Duo](https://github.com/yinkakun/eleventy-duo)
- [Eleventy One](https://github.com/philhawksworth/eleventyone)
- [Hylia](https://github.com/andy-piccalilli/hylia)
- [11ty Netlify Jumpstart](https://github.com/5t3ph/11ty-netlify-jumpstart)
- [Supermaya](https://github.com/MadeByMike/supermaya)
- [huphtur.nl](https://github.com/huphtur/huphtur.nl)
- [11ty Component Macro](https://github.com/trys/11ty-component-macro)


[<img src="https://img.buymeacoffee.com/button-api/?text=Buy me chocolate&emoji=🍫&slug=ygoex&button_colour=ffdbe1&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00">](https://www.buymeacoffee.com/ygoex)
