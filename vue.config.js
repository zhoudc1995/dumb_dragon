module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  devServer: {
    overlay: {
      // eslint校验开启
      warnings: true,
      errors: true,
    },
    /* proxy: {
			'/api': 'http://localhost:3000',
		}, */
  },
  css: {},
  chainWebpack: (config) => {
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js");
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();
  },
};
