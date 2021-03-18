# yetty: Yet another 11ty boilerplate to start a new website with optional blog.

This is a WIP based on [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog).

[![Netlify Status](https://api.netlify.com/api/v1/badges/faab84cf-52cb-4150-b142-f0c4e0e5312f/deploy-status)](https://app.netlify.com/sites/yetty/deploys)

## New features:
- [Sass/Scss](https://github.com/sass/node-sass): Scss files are compiled before Eleventy builds the site. The files are compiled in the `./src/styles` folder and then will be passed through copy (see `.eleventy.js`) to the new site created under `./dist/`. For Netlify users, an alternative option with plugins is explained here: [https://css-tricks.com/making-my-netlify-build-run-sass/](https://css-tricks.com/making-my-netlify-build-run-sass/).

## TO-DO:
- [x] Sass/Scss
- [ ] Compile JS with Webpack/Parcel?
- [ ] PWA
- [ ] Add html-minifier
- [ ] Critical CSS
- [ ] Add custom style
- [ ] Add cross-env
- [x] PostCSS: Autoprefixer
- [x] Purge CSS

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

```
npx eleventy
```

Or build and host locally for local development
```
npx eleventy --serve
```

Or build automatically when a template changes:
```
npx eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx eleventy
```

### Implementation Notes

* `about/index.md` shows how to add a content page.
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
