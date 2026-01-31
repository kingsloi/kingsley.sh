<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const photoRef = ref(null)
const isIncognito = ref(false)

let moveHandler = null

const photoPosition = (photo, offset, e, photoPos) => {
  const touchstart = e.type === 'touchstart' || e.type === 'touchmove'
  const event = touchstart ? e : e
  const pageX = touchstart ? event.touches[0].pageX : event.pageX
  const pageY = touchstart ? event.touches[0].pageY : event.pageY

  const coordX = pageX - offset.left - 96
  const coordY = pageY - offset.top - 96

  const absY = Math.abs(coordY)
  const absX = Math.abs(coordX)

  if (coordX + 96 >= 0 && coordX + 96 <= 194 && coordY + 96 >= 0 && coordY + 96 <= 194) {
    photo.style.backgroundPosition = `0px ${photoPos}`
    photo.style.filter = 'grayscale(0)'
  } else if (coordX >= 0 && coordY < 0) {
    photo.style.filter = 'grayscale(1)'
    if (absX / absY >= 2) {
      photo.style.backgroundPosition = `-200px ${photoPos}`
    } else if (absY / absX >= 2) {
      photo.style.backgroundPosition = `-800px ${photoPos}`
    } else {
      photo.style.backgroundPosition = `-1200px ${photoPos}`
    }
  } else if (coordX >= 0 && coordY >= 0) {
    photo.style.filter = 'grayscale(1)'
    if (absX / absY >= 2) {
      photo.style.backgroundPosition = `-200px ${photoPos}`
    } else if (absY / absX >= 2) {
      photo.style.backgroundPosition = `-600px ${photoPos}`
    } else {
      photo.style.backgroundPosition = `-1400px ${photoPos}`
    }
  } else if (coordX < 0 && coordY >= 0) {
    photo.style.filter = 'grayscale(1)'
    if (absX / absY >= 2) {
      photo.style.backgroundPosition = `-400px ${photoPos}`
    } else if (absY / absX >= 2) {
      photo.style.backgroundPosition = `-600px ${photoPos}`
    } else {
      photo.style.backgroundPosition = `-1600px ${photoPos}`
    }
  } else if (coordX < 0 && coordY < 0) {
    photo.style.filter = 'grayscale(1)'
    if (absX / absY >= 2) {
      photo.style.backgroundPosition = `-400px ${photoPos}`
    } else if (absY / absX >= 2) {
      photo.style.backgroundPosition = `-800px ${photoPos}`
    } else {
      photo.style.backgroundPosition = `-1000px ${photoPos}`
    }
  }
}

const handleClick = () => {
  isIncognito.value = !isIncognito.value
  if (photoRef.value) {
    photoRef.value.style.backgroundPosition = `-1800px 200px`
    photoRef.value.style.filter = 'grayscale(0)'
  }
}

onMounted(() => {
  const photo = photoRef.value
  if (!photo) return

  const rect = photo.getBoundingClientRect()
  const offset = {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
  const photoPos = '200px'

  moveHandler = (e) => {
    photoPosition(photo, offset, e, photoPos)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('touchmove', moveHandler)
})

onUnmounted(() => {
  if (moveHandler) {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
  }
})
</script>

<template>
  <div
    ref="photoRef"
    class="avatar"
    :class="{ 'incognito': isIncognito }"
    @click="handleClick"
  />
</template>
