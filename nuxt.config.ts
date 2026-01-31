export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Static site generation
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/projects']
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'The website of Kingsley Raspe | kingsley.sh',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'All about Kingsley Raspe, Full Stack Developer/DevOps Engineer, based in Gary, Indiana, USA' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://kingsley.sh' },
        { property: 'og:title', content: 'The website of Kingsley Raspe | kingsley.sh' },
        { property: 'og:description', content: 'All about Kingsley Raspe, Full Stack Developer/DevOps Engineer, based in Gary, Indiana, USA' },
        { property: 'og:image', content: '/i/hello-i-am-kingsley-raspe.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,400;0,700;1,400&display=swap' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'https://kingsley.sh'
    }
  },

  content: {
    markdown: {
      anchorLinks: false
    },
    highlight: {
      theme: 'github-dark',
      langs: ['js', 'ts', 'vue', 'css', 'html', 'bash', 'json', 'php']
    },
    build: {
      markdown: {
        remarkPlugins: {},
        rehypePlugins: {},
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    }
  },

  routeRules: {
    '/posts/**': { prerender: true }
  },

  css: ['~/assets/css/main.css']
})
