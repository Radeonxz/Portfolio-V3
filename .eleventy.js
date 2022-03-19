const i18n = require("eleventy-plugin-i18n");
const { DateTime } = require("luxon");

const translations = require("./src/_data/i18n");
const skills = require("./src/_data/skills.json");

module.exports = function (eleventyConfig) {
  // All posts with translations
  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/*.md")
      .filter(function (post) {
        return post.data.isPublished === true;
      });
  });

  eleventyConfig.addCollection("posts_fr", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/*.md")
      .filter(function (post) {
        return post.data.isPublished === true;
      });
  });

  // Featured posts with translations
  eleventyConfig.addCollection("posts_en_featured", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/*.md")
      .filter(function (post) {
        return post.data.isFeatured === true;
      });
  });

  eleventyConfig.addCollection("posts_fr_featured", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/*.md")
      .filter(function (post) {
        return post.data.isFeatured === true;
      });
  });

  eleventyConfig.addCollection("markups", function () {
    return skills.markups;
  });

  eleventyConfig.addCollection("languages", function () {
    return skills.languages;
  });

  eleventyConfig.addCollection("fronts", function () {
    return skills.fronts;
  });

  eleventyConfig.addCollection("backs", function () {
    return skills.backs;
  });

  eleventyConfig.addCollection("miscellaneous", function () {
    return skills.miscellaneous;
  });

  eleventyConfig.addCollection("current_year", function () {
    return new Date().getFullYear();
  });

  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");

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
