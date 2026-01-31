<script setup>
import { format, parse } from 'date-fns'
import hljs from 'highlight.js'
import getSiteMeta from '~/utilities/getSiteMeta'

const route = useRoute()
const config = useRuntimeConfig()

// Parse dates safely for all browsers including Safari/iOS
const parseDate = (datetime) => {
  if (!datetime) return new Date()
  const str = String(datetime)
  if (str.includes('T')) {
    return new Date(str)
  }
  return parse(str, 'yyyy-MM-dd HH:mm:ss', new Date())
}

const { data: page } = await useAsyncData(`post-${route.params.year}-${route.params.slug}`, () => {
  return queryCollection('posts')
    .path(`/posts/${route.params.year}/${route.params.slug}`)
    .first()
})

const formatToHumanDate = (datetime) => {
  return format(parseDate(datetime), 'dd MMMM, yyyy')
}

const meta = computed(() => {
  if (!page.value) return []
  const metaData = {
    type: 'article',
    title: page.value.title,
    description: page.value.description,
    url: `${config.public.baseUrl}/posts/${route.params.year}/${route.params.slug}`,
    mainImage: page.value.image
  }
  return getSiteMeta(metaData)
})

useHead(() => ({
  title: page.value ? `${page.value.title} | kingsley.sh` : 'Loading...',
  meta: [
    ...meta.value,
    {
      property: 'article:published_time',
      content: page.value?.createdAt
    },
    {
      property: 'article:modified_time',
      content: page.value?.updatedAt
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://kingsley.sh/posts/${route.params.year}/${route.params.slug}`
    }
  ]
}))

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll('pre.v-highlight').forEach((block) => {
      hljs.highlightElement(block)
    })
  }, 500)
})
</script>

<template>
  <main v-if="page" :class="`post post--${route.params.slug}`">
    <div v-if="page.img" class="post__highlight" :style="`background-image:url(${page.img})`" />

    <section class="post__inner">
      <div class="container">
        <h1 class="page-title">
          {{ page.title }}
        </h1>

        <div class="post__meta">
          <span data-allow-mismatch="text">{{ formatToHumanDate(page.createdAt) }}</span>
        </div>
      </div>

      <ContentRenderer :value="page" />
    </section>
  </main>
</template>
