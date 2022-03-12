const i18n = require("eleventy-plugin-i18n");
const { DateTime } = require("luxon");

const translations = require("./src/_data/i18n");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/post/*.md");
  });

  eleventyConfig.addCollection("posts_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/post/*.md");
  });

  eleventyConfig.addCollection("posts_en_featured", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/post/*.md")
      .filter(function (post) {
        return post.data.tags.includes("featured");
      });
  });

  eleventyConfig.addCollection("posts_fr_featured", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/post/*.md")
      .filter(function (post) {
        return post.data.tags.includes("featured");
      });
  });

  eleventyConfig.addCollection("currentYear", function () {
    return new Date().getFullYear();
  });

  eleventyConfig.addPassthroughCopy("./src/style.css");
  // eleventyConfig.addPassthroughCopy("./src/landing.css");
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add translations
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      fr: "en"
    }
  });

  eleventyConfig.addFilter("postDate", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MD);
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    }
  };
};
