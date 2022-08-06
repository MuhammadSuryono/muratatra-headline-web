var webpack = require('webpack')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME || 'Muratara Headline',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Muratara Headline' },
      // { hid: 'stripe', src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js', defer: true},
      // { hid: 'stripe', src: 'https://code.jquery.com/jquery-3.4.1.min.js', defer: true},
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.jpeg' },
      // Template Stylesheet
      { rel: 'stylesheet', href: '/css/theme.css'},
      // Google Fonts
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap'},
      // Library
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css'},
      { rel: 'stylesheet', href: '/css/lib/slick.css'},
      { rel: 'stylesheet', href: '/css/lib/slick-theme.css'}
    ],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/static/js/jquery.min.js', type:'text/javascript', mode: 'client'},
    { src: '@/static/js/jquery-ui.min.js', type:'text/javascript', mode: 'client'},
    { src: '@/static/js/bootstrap.min.js', type:'text/javascript', mode: 'client'},
    { src: '@/static/js/jquery.min.js', type:'text/javascript', mode: 'client'},
    { src: '@/static/js/jquery-ui.min.js', type:'text/javascript', mode: 'client'},
    { src: '@/static/css/lib/easing/easing.min.js', mode: 'client'},
    { src: '@/static/css/lib/slick.min.js', mode: 'client'},
    { src: '@/static/js/main.js', mode: 'client'},
    '@/plugins/axios',
    '@/plugins/axios2',
    '@/plugins/general'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: 'https://api.petraverse.id/data/v1',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'customer/login', method: 'post' },
          user: { url: 'user', method: 'get' },
          logout: false
        }

        // tokenRequired: true,
        // tokenType: 'Bearer',
        // tokenName: 'Authorization'
      }
    },
    rewriteRedirects: false,

    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      home: "/"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
