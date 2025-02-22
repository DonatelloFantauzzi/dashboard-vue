<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">📊 Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard title="Utenti attivi" icon="👥" :value="1500" />
      <StatsCard title="Ordini Completati" icon="✅" :value="358" />
      <StatsCard title="Guadagni Mensili" icon="💰" :value="'€ ' + 1200" />
    </div>
    <div class="mt-6">
      <ChartWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChartWidget from '@/components/ChartWidget.vue'
import StatsCard from '@/components/StatsCard.vue'
</script>
