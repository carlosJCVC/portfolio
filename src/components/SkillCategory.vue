<template>
  <div
    class="relative overflow-hidden bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
  >
    <div class="absolute inset-0 bg-white dark:bg-gray-800 opacity-80 backdrop-blur-sm z-0"></div>
    <div class="relative z-10 p-8">
      <h3 class="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-300">
        {{ $t('skills.categories.title') }}
      </h3>
      <div
        class="bg-white bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-xl p-6 shadow-inner transition-colors duration-300"
      >
        <div ref="radarChart" class="w-full h-[400px]"></div>
      </div>
      <div class="mt-6 flex justify-between items-center">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          {{ $t('skills.categories.proficiency') }}</span
        >
        <div class="flex space-x-2">
          <span class="w-3 h-3 bg-indigo-200 rounded-full"></span>
          <span class="w-3 h-3 bg-indigo-400 rounded-full"></span>
          <span class="w-3 h-3 bg-indigo-600 rounded-full"></span>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    ></div>
  </div>

  <!-- <div class="bg-white bg-opacity-10 rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4 text-center">Skill Categories</h3>
        <div ref="radarChart" class="w-full h-[350px]"></div>
    </div> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as d3 from 'd3'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store/useThemeStore'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const radarChart = ref(null)
const skillCategories = {
  Frontend: 90,
  Backend: 85,
  Database: 80,
  DevOps: 70,
  Mobile: 60
}

onMounted(() => {
  initRadarChart()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
})

const initRadarChart = () => {
  const chartElement = radarChart.value
  const margin = { top: 50, right: 50, bottom: 50, left: 50 }
  const width = chartElement.clientWidth - margin.left - margin.right
  const height = chartElement.clientHeight - margin.top - margin.bottom

  // clear svg
  d3.select(chartElement).selectAll('svg').remove()

  const svg = d3
    .select(chartElement)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`)

  const radarScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, Math.min(width, height) / 2])

  const angleScale = d3
    .scaleOrdinal()
    .domain(Object.keys(skillCategories))
    .range(d3.range(0, 2 * Math.PI, (2 * Math.PI) / Object.keys(skillCategories).length))

  const line = d3
    .lineRadial()
    .radius((d) => radarScale(d))
    .angle((d, i) => angleScale(Object.keys(skillCategories)[i]))
    .curve(d3.curveLinearClosed)

  const getColor = (dark, light) => (theme.value === 'dark' ? dark : light)

  svg
    .selectAll('.radar-axis')
    .data(Object.keys(skillCategories))
    .enter()
    .append('line')
    .attr('class', 'radar-axis')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d) => radarScale(100) * Math.cos(angleScale(d) - Math.PI / 2))
    .attr('y2', (d) => radarScale(100) * Math.sin(angleScale(d) - Math.PI / 2))
    .attr('stroke', getColor('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)'))
    .attr('stroke-opacity', 0.2)

  svg
    .selectAll('.radar-circle')
    .data([20, 40, 60, 80, 100])
    .enter()
    .append('circle')
    .attr('class', 'radar-circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', (d) => radarScale(d))
    .attr('fill', 'none')
    .attr('stroke', getColor('rgba(232, 235, 255, 0.25)', 'rgba(0, 0, 139, 0.10)'))
  // .attr('stroke-opacity', 0.1);

  svg
    .append('path')
    .datum(Object.values(skillCategories))
    // .datum([...Object.values(skillCategories), Object.values(skillCategories)[0]])
    .attr('d', line)
    .attr('fill', getColor('rgba(96, 165, 250, 0.2)', 'rgba(37, 99, 235, 0.2)'))
    .attr('stroke', getColor('#60A5FA', '#2563EB'))
    .attr('stroke-width', 2)

  svg
    .selectAll('.radar-label')
    .data(Object.keys(skillCategories))
    .enter()
    .append('text')
    .attr('class', 'radar-label')
    .attr('x', (d) => radarScale(100) * 1.2 * Math.cos(angleScale(d) - Math.PI / 2))
    .attr('y', (d) => radarScale(100) * 1.2 * Math.sin(angleScale(d) - Math.PI / 2))
    .text((d) => d)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', getColor('#E5E7EB', '#1F2937'))
}

watch(theme, () => {
  initRadarChart()
})

const onWindowResize = () => {
  initRadarChart()
}
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
