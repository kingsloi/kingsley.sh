<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import providerBills from '~/public/2-weeks-in-the-icu-as-a-baby-born-with-congenital-heart-disease.json'

const counter = ref(0)
const view = ref('by-item')
const filtered = ref([])
let intervalId = null

const bills = computed(() => providerBills)

const total = computed(() => {
  return bills.value.reduce((sum, bill) => sum + bill.cost, 0).toFixed(0)
})

const grouped = computed(() => {
  const result = bills.value.reduce((r, { item, cost, category }) => {
    const regex = new RegExp(/^[^\(]+(?=)/, 'gmi')
    const name = item.match(regex)[0].split(' - ')[0]

    const temp = r.find(o => o.item === name)
    if (!temp) {
      r.push({ item: name, original: item, cost, quantity: 1, category, individual: cost })
    } else {
      temp.quantity += 1
      temp.cost += cost
    }
    return r
  }, [])

  const sorted = [...result].sort((a, b) => a.individual - b.individual)
  const groupedData = {}

  sorted.forEach(item => {
    if (!groupedData[item.category]) {
      groupedData[item.category] = []
    }
    groupedData[item.category].push(item)
  })

  return groupedData
})

const chartData = computed(() => {
  const labels = []
  const datasets = []
  const colors = []

  for (const group in grouped.value) {
    const values = grouped.value[group]
    labels.push(group)
    const dataset = values.reduce((sum, v) => sum + v.cost, 0)
    datasets.push(dataset)
    colors.push(`#${intToRGB(hashCode(group))}`)
  }

  return {
    labels,
    datasets: [{
      label: 'dataset-1',
      backgroundColor: colors,
      data: datasets
    }]
  }
})

const individualChartOpts = {
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || ''
          const value = context.parsed || 0
          return `${label} - ${formatCurrency(value)}`
        }
      }
    }
  }
}

const mainChartOpts = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || ''
          const value = context.parsed || 0
          return `${label} - ${formatCurrency(value)}`
        }
      }
    }
  }
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB(i) {
  const c = (i & 0x00FFFFFF).toString(16).toUpperCase()
  return '00000'.substring(0, 6 - c.length) + c
}

function formatCurrency(value) {
  return `$ ${Number(value.toFixed(2)).toLocaleString()}`
}

function getCategoryTotal(category) {
  const categoryBills = bills.value.filter(e => e.category === category)
  const total = categoryBills.reduce((sum, e) => sum + e.cost, 0)
  return formatCurrency(total)
}

function generateChartData(group, items) {
  const data = []
  const colors = []
  const labels = []

  for (const idx in items) {
    const item = items[idx]
    labels.push(item.item)
    data.push(item.cost)
    colors.push(`#${intToRGB(hashCode(item.item))}`)
  }

  return {
    labels,
    datasets: [{
      backgroundColor: colors,
      data
    }]
  }
}

function toggleData(group, label, index) {
  if (filtered.value.indexOf(label.toLowerCase()) > -1) {
    filtered.value = filtered.value.filter(item => item !== label.toLowerCase())
  } else {
    filtered.value.push(label.toLowerCase())
  }
}

onMounted(() => {
  intervalId = setInterval(() => {
    if (counter.value != total.value) {
      let change = (total.value - counter.value) / 10
      change = change >= 0 ? Math.ceil(change) : Math.floor(change)
      counter.value = counter.value + change
    }
  }, 20)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="surviving-chd" :class="{ 'lg:-mx-10': view === 'by-item' }">
    <div class="cochditusa text-right mb-14">
      <h2 class="text-xl w-3/4 ml-auto">Admission at <span class="redacted">ADVOCATE</span> CHILDRENS HOSPITAL</h2>
      <h3 class="mt-0 text-xl "><span class="redacted">Blue</span> Cross <span class="redacted">Blue</span> Shield/<span class="redacted">Ant</span>hem</h3>
      <time datetime="2021-04-06 08:22:00">April 6th, 2021 to April 20th, 2021</time>
      <span class="block uppercase text-sm mt-3 text-gray-500">Pending Insurance*</span>
      <span class="counter -mt-3 block">{{ formatCurrency(counter) }}</span>
      <p class="!text-xs block italic mt-0 mb-10 w-1/2 ml-auto text-right"><mark>* The amount your insurance has not yet responded to. Depending on the response from your insurance, some or all of this amount could become your responsibility.</mark></p>
    </div>

    <ul class="list-none p-0 text-center mb-4">
      <li class="inline-block"><a href="#" class="" @click.prevent="view = 'by-item'" :class="{ 'font-bold': view === 'by-item' }">by item</a></li>
      <li class="inline-block mx-2">|</li>
      <li class="inline-block"><a href="#" class="" @click.prevent="view = 'by-category'" :class="{ 'font-bold': view === 'by-category' }">by category</a></li>
      <li class="inline-block mx-2">|</li>
      <li class="inline-block"><a href="/2-weeks-in-the-icu-as-a-baby-born-with-congenital-heart-disease.json" target="_blank">json</a></li>
    </ul>

    <template v-if="view === 'by-item'">
      <table class="w-full text-sm">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="p-2 text-left">Item</th>
            <th class="p-2 text-right pr-4">Cost</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(items, group) in grouped" :key="group">
            <tr class="font-bold relative bg-gray-100">
              <td class="p-2">{{ group }}</td>
              <td class="p-2 text-right">{{ getCategoryTotal(group) }}</td>
            </tr>

            <tr>
              <td colspan="2" class="p-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="py-3">
                    <div class="panel">
                      <piechart :chart-data="generateChartData(group, items)" :options="individualChartOpts" />
                    </div>
                  </div>

                  <div class="mt-3 md:mt-0">
                    <table class="w-full text-sm bg-white">
                      <tbody>
                        <tr v-for="(item, index) in items" :key="item.item" class="bg-white border-b">
                          <td :title="item.original" class="bg-white p-2">
                            <a href="#" class="block border-b-0" @click.prevent="toggleData(group, item.item, index)">
                              <span class="inline-block w-5 h-5 align-middle mr-2" :style="`background-color: #${intToRGB(hashCode(item.item))}`">&nbsp;</span>

                              <template v-if="filtered.indexOf(item.item.toLowerCase()) > -1">
                                <s>{{ item.item }}</s>
                              </template>
                              <template v-else>
                                {{ item.item }}
                              </template>
                            </a>
                          </td>
                          <td class="text-right text-xs bg-white p-2">
                            <span class="text-gray-500">qty</span> {{ item.quantity }}<br />
                            <span class="text-gray-500">@</span> {{ formatCurrency(item.individual) }}<br />
                            <span class="border-t">
                              <span class="text-gray-500">total</span> {{ formatCurrency(item.cost) }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
    <template v-if="view === 'by-category'">
      <piechart :chart-data="chartData" :options="mainChartOpts" />
    </template>
  </div>
</template>

<style scoped>
.cochditusa .counter {
  font-size: 3.5rem;
  font-weight: bold;
}
</style>
