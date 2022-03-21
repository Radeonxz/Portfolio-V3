module.exports = function (collection) {
  return collection.getFilteredByGlob(
    "./src/_11ty/collections/projects/en/*.md"
  );
};
