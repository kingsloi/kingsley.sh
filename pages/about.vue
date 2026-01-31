<script setup>
import getSiteMeta from '~/utilities/getSiteMeta'

const metaData = {
  type: 'website',
  title: 'About Kingsley Raspe',
  description: 'Who is Kingsley Raspe?'
}
const meta = getSiteMeta(metaData)

useHead({
  title: 'About Kingsley Raspe | kingsley.sh',
  meta: [...meta]
})
</script>

<template>
  <main class="site-content">
    <section class="container">
      <h1>About Kingsley Raspe</h1>
      <p class="lead mb-20">
        Kingsley is a open-source enthusiast and generalist, who writes code for the internet. He uses a variety of languages and technology in his job as a Laravel Developer at Affiliate.com. Originally from the UK, he now resides in the beautiful lakeside city of Gary, Indiana, with his wife, son, and pets. He likes DIY, long walks on the beach, gardening/nature/greenery, and vintage roots reggae.
      </p>

      <div class="deets-grid">
        <div>Expertise</div>
        <div class="mb-4">15+ years expertise building/shipping with open-source tech. PHP (Laravel), Livewire, Alpine.js, Node.js, Vue.js, Express.js, Tailwind, SASS, Lambda/serverless, DevOps, Bash, AWS, MySQL, Redis, &amp; much more</div>

        <div>Employed</div>
        <div>Laravel Developer at Affiliate.com</div>

        <div>Resume</div>
        <div><a href="/kingsley-raspe-full-stack-developer-resume.pdf" target="_blank">kingsley-raspe-full-stack-developer-resume.pdf</a></div>

        <div>Availability</div>
        <div class="mb-4"><span class="mark mark--other inline-block p-1 pr-2">open to new opportunities ✅</span></div>

        <div>Email</div>
        <div><abbr title="you have to manually type me into your email field"><span data-user="olleh" data-website="hs.yelsgnik" class="inline-block mark e-mail cursor-help"></span></abbr></div>

        <div>Location</div>
        <div class="mb-4"><s>Tamworth, UK</s> &rarr; Gary, IN, USA (GMT +6)</div>

        <div>Github</div>
        <div><a href="https://github.com/kingsloi" target="_blank">github/kingsloi</a></div>

        <div>StackOverflow</div>
        <div><a href="https://stackoverflow.com/users/1132557/kingsley" target="_blank">stackoverflow/kingsley</a></div>

        <div>LinkedIn</div>
        <div><a href="https://www.linkedin.com/in/kingsleyraspe/" target="_blank">linkedin/kingsleyraspe</a></div>
      </div>
    </section>
  </main>
</template>
