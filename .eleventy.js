const htmlmin = require("html-minifier");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const sharpPlugin = require("eleventy-plugin-sharp");

module.exports = function (eleventyConfig) {
  /**
   * Upgrade helper
   * Uncomment if you need help upgrading to new major version.
   */
  //eleventyConfig.addPlugin(UpgradeHelper);

  // https://www.11ty.dev/docs/languages/nunjucks/#generic-global
  eleventyConfig.addNunjucksGlobal(
    "personal_address",
    process.env.PERSONAL_ADDRESS
  );
  eleventyConfig.addNunjucksGlobal(
    "personal_phone",
    process.env.PERSONAL_PHONE
  );
  eleventyConfig.addNunjucksGlobal("personal_mail", process.env.PERSONAL_MAIL);
  eleventyConfig.addNunjucksGlobal(
    "personal_actual_vacation_date",
    process.env.PERSONAL_ACTUAL_VACATION_DATE
  );
  eleventyConfig.addNunjucksGlobal(
    "personal_vacation_date",
    process.env.PERSONAL_VACATION_DATE
  );
  eleventyConfig.addNunjucksGlobal(
    "external_vacation_date",
    process.env.EXTERNAL_VACATION_DATE
  );
  eleventyConfig.addNunjucksGlobal(
    "another_vacation_date",
    process.env.ANOTHER_VACATION_DATE
  );
  eleventyConfig.addNunjucksGlobal(
    "cv_htaccess_user_01",
    process.env.CV_HTACCESS_USER_01
  );
  eleventyConfig.addNunjucksGlobal(
    "cv_htaccess_password_01",
    process.env.CV_HTACCESS_PASSWORD_01
  );
  eleventyConfig.addNunjucksGlobal(
    "cv_htaccess_user_02",
    process.env.CV_HTACCESS_USER_02
  );
  eleventyConfig.addNunjucksGlobal(
    "cv_htaccess_password_02",
    process.env.CV_HTACCESS_PASSWORD_02
  );

  /**
   * https://github.com/luwes/eleventy-plugin-sharp
   */
  pathPrefix = "/";
  eleventyConfig.addPlugin(
    sharpPlugin({
      urlPath: `${pathPrefix}/img`,
      outputDir: "./_site/img",
    })
  );

  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");

  /**
   * HTML Minifier for production builds
   */
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV == "production" &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter("removeSpaces", function (string) {
    return string.replace(/\s/g, "");
  });

  return {
    dir: {
      input: "src",
      data: "../_data",
    },
    pathPrefix: pathPrefix,
  };
};
