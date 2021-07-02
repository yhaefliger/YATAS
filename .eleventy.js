const htmlmin = require('html-minifier')


module.exports = function(eleventyConfig) {
  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  //eleventyConfig.addPassthroughCopy('src/.htaccess')

  /**
   * HTML Minifier for production builds
   */
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV == 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  return {
    dir: {
      input: "src",
      data: "../_data"
    }
  };
};