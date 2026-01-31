<script setup>
import { ref, onMounted, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)

defineExpose({
  chartRef,
  _data: {
    get _chart() {
      return chartRef.value?.chart
    }
  }
})
</script>

<template>
  <Doughnut
    ref="chartRef"
    :data="chartData"
    :options="options"
  />
</template>
