# yetty: Yet another 11ty boilerplate to start a new website with optional blog.

This is a WIP based on [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) et al.

[![Netlify Status](https://api.netlify.com/api/v1/badges/faab84cf-52cb-4150-b142-f0c4e0e5312f/deploy-status)](https://app.netlify.com/sites/yetty/deploys)

![GitHub](https://img.shields.io/github/license/ygoex/yetty?style=for-the-badge)

## New features:
- [Sass/Scss](https://github.com/sass/node-sass): Scss files are compiled before Eleventy builds the site. The files are compiled in the `./src/styles` folder and then will be passed through copy (see `.eleventy.js`) to the new site created under `./dist/`. For Netlify users, an alternative option with plugins is explained here: [https://css-tricks.com/making-my-netlify-build-run-sass/](https://css-tricks.com/making-my-netlify-build-run-sass/).
- [Critical CSS](https://github.com/gregives/eleventy-critical-css): Critical CSS is automatically included in the head of the document using the [eleventy-critical-css plugin](https://www.npmjs.com/package/eleventy-critical-css).
- PostCSS ([Autoprefixer](https://github.com/postcss/autoprefixer) and [PurgeCSS](https://github.com/FullHuman/purgecss)): Both dependencies have been set up to run through the main css stylesheet after Eleventy has generated the dist folder.

## TO-DO:
- [x] Sass/Scss
- [x] Bundle JS with Webpack
- [x] PWA
- [x] Add html-minifier
- [x] Remove inline CSS and leave only resources and documentation for doing it.
- [x] Refact scripts in package.json
- [x] Critical CSS
- [ ] Add custom style
- [x] Add cross-env
- [x] PostCSS: Autoprefixer
- [x] PostCSS: Purge CSS
- [ ] Image processing

## Demo

* [yetty](https://yetty.netlify.app/)

## Deploy this to your own site

This builder is amazing. Try it out to get your own yetty site in a few clicks!

* [Get your own yetty web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/ygoex/yetty)

## Getting Started

### 1. Clone this Repository

```
git clone https://github.com/ygoex/yetty.git my-new-project
```


### 2. Navigate to the directory

```
cd my-new-project
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

For local development and reload http://localhost:8080/ when a template, style or js changes:
```
npm start
```

To build for production:
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
* Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
	* Because `css` and `png` are listed in `templateFormats` but are not supported template types, any files with these extensions will be copied without modification to the output (while keeping the same directory structure).
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
