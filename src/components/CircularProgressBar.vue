<template>
    <div class="circular-progress-bar" :style="containerStyle">
      <svg :width="size" :height="size" viewBox="0 0 36 36" class="circular-chart">
        <path class="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          :stroke-width="strokeWidth"
        />
        <path class="circle"
          :stroke-dasharray="`${percentage}, 100`"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          :stroke-width="strokeWidth"
        />
        <text x="18" y="20.35" class="percentage">{{ percentage }}%</text>
      </svg>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    percentage: {
      type: Number,
      required: true
    },
    strokeWidth: {
      type: Number,
      default: 2.5
    },
    size: {
      type: Number,
      default: 100
    }
  });
  
  const containerStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`
  }));
  </script>
  
  <style scoped>
  .circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 100%;
    max-height: 250px;
  }
  .circle-bg {
    fill: none;
    stroke: #3e3e3e;
  }
  .circle {
    fill: none;
    stroke: #3e98c7;
    stroke-linecap: round;
    transition: stroke-dasharray 0.5s ease;
  }
  .percentage {
    fill: #fff;
    font-family: sans-serif;
    font-size: 0.5em;
    text-anchor: middle;
  }
  </style>