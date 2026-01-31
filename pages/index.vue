<script setup>
import { format, getYear } from 'date-fns'
import getSiteMeta from '~/utilities/getSiteMeta'

// Safari/iOS requires ISO 8601 format with 'T' separator
const parseDate = (datetime) => {
  if (!datetime) return new Date()
  const isoString = String(datetime).replace(' ', 'T')
  return new Date(isoString)
}

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('posts')
    .order('createdAt', 'DESC')
    .all()
})

const blogroll = computed(() => {
  if (!posts.value) return []

  const grouped = {}
  posts.value.forEach(post => {
    const year = getYear(parseDate(post.createdAt))
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(post)
  })

  return Object.entries(grouped)
    .map(([year, yearPosts]) => ({ year, posts: yearPosts }))
    .sort((a, b) => Number(b.year) - Number(a.year))
})

const formatToHumanDate = (datetime) => {
  return format(parseDate(datetime), 'dd/MM')
}

const getPostYear = (datetime) => {
  return getYear(parseDate(datetime))
}

const meta = getSiteMeta()

useHead({
  meta: [...meta]
})
</script>

<template>
  <main class="site-content">
    <section class="container about-kingsley">
      <blockquote class="blockquote">
        <i-am-kingsley />
        <p class="lead">
          Hi there! My name's Kingsley. I'm a Brit, who's been living in the US since 2016. I write code for things on the internet. More specifically, I'm an Open Source Enthusiast &amp; I work as a Laravel Developer in the affiliate industry.
        </p>
        <p>
          A full-stack developer, generalist, and environmentalist, I enjoy combining my obsessive attention to detail, with my love for making things, and the environment, with a mission-driven work ethic of changing the world, in one small positive way at a time. Checkout some of my <NuxtLink to="/projects">
            work
          </NuxtLink>, or say <NuxtLink to="/about">
            hello!
          </NuxtLink>
        </p>
      </blockquote>
    </section>

    <section class="blogroll">
      <div class="container">
        <section v-for="section in blogroll" :key="section.year" class="blogroll__section">
          <h3 class="blogroll__year">
            {{ section.year }}
          </h3>
          <ul class="list-none pl-0">
            <li v-for="post in section.posts" :key="post.path">
              <article class="blogroll__post">
                <header
                  class="blogroll__post__heading"
                  :class="{ 'starred': post.starred }"
                >
                  <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
                  <time class="text-sm" :datetime="post.createdAt">{{ formatToHumanDate(post.createdAt) }}</time>
                </header>
                <p v-html="post.description" />
              </article>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </main>
</template>
