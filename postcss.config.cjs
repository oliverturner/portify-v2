/* eslint @typescript-eslint/no-var-requires: "off" */

const autoprefixer = require("autoprefixer");
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");

module.exports = {
	plugins: [autoprefixer, postcssJitProps(OpenProps)],
};
