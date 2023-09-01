const htmlmin = require('html-minifier')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const {DateTime} = require("luxon");
const fs = require('fs')

module.exports = function (eleventyConfig) {
    /**
     * Upgrade helper
     * Uncomment if you need help upgrading to new major version.
     */
    //eleventyConfig.addPlugin(UpgradeHelper);

    /**
     * Files to copy
     * https://www.11ty.dev/docs/copy/
     */

    const getSvgContent = function (fileName, classes = '') {
        const relativeFilePath = `./src/svg/${fileName}.svg`;
        let data = fs.readFileSync(relativeFilePath,
            function (err, contents) {
                if (err) return err
                return contents
            });

        data = data.toString('utf8');

        if (classes) {
            data = data.replace("<svg", `<svg class="${classes}"`)
        }

        return data
    }

    eleventyConfig.addShortcode("svg", getSvgContent);

    eleventyConfig.addPassthroughCopy('src/img')

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

    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
        const date = DateTime.fromJSDate(new Date(dateObj), {zone: zone || "utc"}).toFormat(format || "dd LLLL, yyyy");
        // console.log(typeof date, date);
        return date;
    });

    return {
        dir: {
            input: "src",
            data: "../_data"
        }
    };
};

