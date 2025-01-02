const { defineConfig } = require('@vue/cli-service')
// vue.config.js
/*module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          isCustomElement: (tag) => tag === 'UserLogin' || tag === 'SignUp' // Add your custom element tag names here
        }
      });
  }
};*/
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
      config.plugin('define').tap((definitions) => {
          Object.assign(definitions[0], {
              __VUE_OPTIONS_API__: 'true',
              __VUE_PROD_DEVTOOLS__: 'false',
              __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
          });
          return definitions;
      });
  },
};
