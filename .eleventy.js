const i18n = require("eleventy-plugin-i18n");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { DateTime } = require("luxon");
const fs = require("fs");

const translations = require("./src/_data/i18n");
const skills = require("./src/_data/skills.json");

const NOT_FOUND_PATH = "./src/404.html";
module.exports = function (eleventyConfig) {
  // All posts with translations
  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/*.md")
      .filter(function (post) {
        return post.data.isPublished;
      });
  });

  eleventyConfig.addCollection("posts_fr", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/*.md")
      .filter(function (post) {
        return post.data.isPublished;
      });
  });

  // Featured posts with translations
  eleventyConfig.addCollection("posts_en_featured", function (collection) {
    return collection
      .getFilteredByGlob("./src/en/*.md")
      .filter(function (post) {
        return post.data.isPublished && post.data.isFeatured;
      });
  });

  eleventyConfig.addCollection("posts_fr_featured", function (collection) {
    return collection
      .getFilteredByGlob("./src/fr/*.md")
      .filter(function (post) {
        return post.data.isPublished && post.data.isFeatured;
      });
  });

  // All projects with translations
  eleventyConfig.addCollection(
    "projects_en",
    require("./src/_11ty/collections/projects/projects_en.js")
  );

  eleventyConfig.addCollection(
    "projects_fr",
    require("./src/_11ty/collections/projects/projects_fr.js")
  );

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

  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/admin");

  // Add translations
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      fr: "en"
    }
  });

  // Options for the `markdown-it` library
  const markdownItOptions = {
    html: true
  };

  // Options for the `markdown-it-anchor` library
  const markdownItAnchorOptions = {
    permalink: true
  };

  const markdownLib = markdownIt(markdownItOptions).use(
    markdownItAnchor,
    markdownItAnchorOptions
  );

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addFilter("postDate", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MD);
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(
              `Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`
            );
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    }
  };
};
