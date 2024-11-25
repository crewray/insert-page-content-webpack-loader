const path = require("path");

module.exports = function (source) {
  const options = this.query;
  const pagesJson = require(path.join(process.cwd(), "src/pages.js"))();
  const pages = pagesJson.pages;
  pagesJson.subPackages.forEach((item) => {
    item.pages.forEach((page) => {
      page.path = item.root + "/" + page.path;
      pages.push(page);
    });
  });
  const currentPath = this.resourcePath;
  let isPage = false;
  for (let i = 0; i < pages.length; i++) {
    if (currentPath.includes(path.join("", pages[i].path))) {
      isPage = true;
      break;
    }
  }
  if (!isPage) return source;
  const reg = typeof options.regexp === "string" ? new RegExp(options.regexp) : options.regexp;
  let result = source.replace(reg, options.callback);
  return result;
};
