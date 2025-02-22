<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
    <h2 class="text-lg font-semibold mb-4">📈 Vendite Settimanali</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const chartCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!chartCanvas.value) return

  new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      datasets: [
        {
          label: 'Vendite Settimanali',
          data: [120, 150, 170, 210, 250, 300, 350],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
        },
      ],
    },
  })
})
</script>
