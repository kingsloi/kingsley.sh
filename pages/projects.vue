<script setup>
import getSiteMeta from '~/utilities/getSiteMeta'

const projects = [
  {
    name: 'fiorillo-us.com',
    url: 'https://fiorillo-us.com',
    image: '/i/projects/fiorillo-us.com-beekeeping-equipment.jpg',
    description: 'US catalog for Fiorillo, an Italian manufacturer of beekeeping equipment like extractors, protective clothing, and apiary tools.',
    stack: ['Statamic', 'Laravel', 'Tailwind']
  },
  {
    name: 'philipsbrothers.com',
    url: 'https://philipsbrothers.com',
    image: '/i/projects/philipsbrothers-electrical-contractors.jpg',
    description: 'Inventory catalog for a family-owned electrical contractor with 1,500+ transformers, generators, and load banks for rent or purchase.',
    stack: ['Laravel', 'Nova', 'Bootstrap']
  },
  {
    name: 'sterlingstrong.foundation',
    url: 'https://sterlingstrong.foundation/',
    image: '/i/projects/sterlingstrong.foundation.png',
    description: 'Non-profit foundation helping families facing rare illnesses, long ICU stays, and medical hardship.',
    stack: ['Nuxt.js', 'Vue.js', 'Bootstrap', 'Donorbox', 'RSVPify']
  },
  {
    name: 'sterlingstrong.life',
    url: 'https://sterlingstrong.life/',
    image: '/i/projects/sterling-strong-beads-of-courage.png',
    description: 'A tribute to our daughter Sterling, sharing her story and journey.',
    stack: ['Laravel', 'Tailwind']
  },
  {
    name: 'millerbeach.community',
    url: 'https://millerbeach.community',
    post: '/posts/2019/millerbeach-comminity-air-quality-and-industry-tracker-website',
    image: '/i/projects/fleetmon-vessel-tracking.png',
    description: 'Real-time air quality, flight, and vessel tracking for Gary, Indiana.',
    stack: ['Express.js', 'Vue.js', 'Redis'],
    repo: 'https://github.com/kingsloi/community-airmonitor'
  },
  {
    name: 'happybirthdaymaddie.com',
    url: 'https://happybirthdaymaddie.com/2020',
    image: '/i/projects/happybirthdaymaddie.com.jpg',
    description: 'Annual custom birthday website for my wife, featuring games and music videos.',
    stack: ['GDevelop', 'Pixel Art'],
    repo: 'https://github.com/kingsloi/happybirthdaymaddie.com/2020'
  },
  {
    name: 'heyareyou.online',
    url: 'https://heyareyou.online/',
    image: '/i/projects/heyareyou.online.png',
    description: 'Share your online availability status with teams across time zones.',
    stack: ['Laravel', 'Vue.js'],
    repo: 'https://github.com/kingsloi/heyareyou.online'
  },
  {
    name: 'whynotemploy.me',
    url: 'https://whynotemploy.me/',
    image: '/i/projects/whynotemploy.me.png',
    description: 'The personal site that landed me my first US internship in 2011.',
    stack: ['Laravel'],
    repo: 'https://github.com/kingsloi/whynotemploy.me'
  },
  {
    name: 'madabouthair.online',
    url: 'https://madabouthair.online/',
    image: '/i/projects/madabouthair.online.png',
    description: "Website and blog for my wife's hair styling business.",
    stack: ['Laravel', 'cnvs/easel'],
    repo: 'https://github.com/kingsloi/madabouthair.online'
  }
]

const metaData = {
  type: 'website',
  title: 'Projects',
  description: 'Selected Projects by Kingsley Raspe, Full Stack Developer/DevOps Engineer based in Gary, Indiana.'
}
const meta = getSiteMeta(metaData)

useHead({
  title: 'Recent Projects | kingsley.sh',
  meta: [...meta]
})
</script>

<template>
  <main class="site-content">
    <section class="container">
      <h1>Things I've Done</h1>
      <p class="lead">
        A sample of projects I've worked on.
      </p>

      <div class="projects-grid">
        <article v-for="project in projects" :key="project.name" class="project-card">
          <a :href="project.url" target="_blank" class="project-card__image">
            <div v-if="project.comingSoon" class="project-card__placeholder">
              <span>Coming Soon</span>
            </div>
            <img v-else :src="project.image" :alt="project.name" />
          </a>
          <div class="project-card__content">
            <h2 class="project-card__title">
              <a :href="project.url" target="_blank">{{ project.name }}</a>
            </h2>
            <p class="project-card__description">{{ project.description }}</p>
            <div class="project-card__stack">
              <span v-for="tech in project.stack" :key="tech" class="project-card__tech">{{ tech }}</span>
            </div>
            <div v-if="project.repo || project.post" class="project-card__links">
              <a v-if="project.repo" :href="project.repo" target="_blank">GitHub</a>
              <NuxtLink v-if="project.post" :to="project.post">Read more</NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.project-card {
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-card__image {
  display: block;
  border: none;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.project-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.project-card:hover .project-card__image img {
  transform: scale(1.03);
}

.project-card__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card__placeholder span {
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.9;
}

.project-card__content {
  padding: 1rem;
}

.project-card__title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.project-card__title a {
  border: none;
  color: inherit;
}

.project-card__title a:hover {
  text-decoration: underline;
}

.project-card__description {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.project-card__tech {
  background: #e0e0e0;
  color: #333;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.project-card__links {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
}

.project-card__links a {
  color: #666;
  border: none;
}

.project-card__links a:hover {
  color: #000;
  text-decoration: underline;
}
</style>
