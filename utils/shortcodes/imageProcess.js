const path = require("path");
const Image = require("@11ty/eleventy-img");
const developmentFormats = ["jpeg"];
const productionFormats = ["avif", "webp", "jpeg"];

async function imageShortcode(src, alt, sizes = '100vw', pictureClass, cssClass, bannerBorderColor = 'transparent', caption) {
  if(alt === undefined) {
    // We throw an error on missing alt (alt="" works okay for decorative images)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
  }
  let metadata = await Image(src, {
    widths: [480, 960, 1440],
    /**
     * The eleventy-img plugin takes a while to work,
     * so let's skip all that image processing in development.
     */
    formats:
    process.env.ELEVENTY_ENV === "production"
      ? productionFormats
      : developmentFormats,
    /**
     * A path-prefix-esque directory for the <img src> attribute
     * e.g. /img/ for <img src="/img/MY_IMAGE.jpeg">
     */
    urlPath: "/assets/images/",
    /**
     * Where to write the new images to disk. Project-relative path to the
     * output image directory. Maybe you want to write these to your output
     * directory directly (e.g. ./_site/img/)?
     */
    outputDir: "./dist/assets/images/",
    filenameFormat: function (id, src, width, format, options) {
    // id: hash of the original image
    // src: original image path
    // width: current width in px
    // format: current file format
    // options: set of options passed to the Image call
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    return `${name}-${width}.${format}`;
  }
  })
  //Take the smaller image to be used in the img tag
  let lowsrc = metadata.jpeg[0];

  return `<figure class="${pictureClass}" style="--banner-border-color: ${bannerBorderColor}"><picture>
  ${Object.values(metadata).map(imageFormat => {
    return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
  }).join("\n")}
    <img
      class="${cssClass}"
      src="${lowsrc.url}"
      width="${lowsrc.width}"
      height="${lowsrc.height}"
      alt="${alt}"
      loading="lazy"
      decoding="async">
    ${(caption && cssClass === 'img-post') ? `<figcaption>${caption}</figcaption>` : ''}
  </picture></figure>`;
}

module.exports = imageShortcode;
