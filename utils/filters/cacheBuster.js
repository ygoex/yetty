//Based on https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
// and https://bnijenhuis.nl/notes/2021-04-23-cache-busting-in-eleventy/

module.exports = function cacheBuster(url) {
  const [urlPart, paramPart] = url.split("?");
  const params = new URLSearchParams(paramPart || "");
  params.set("v", Date.now());
  return `${urlPart}?${params}`;
}
