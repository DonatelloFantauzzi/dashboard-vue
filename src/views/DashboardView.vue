<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">📊 Dashboard</h1>

    <p v-if="store.error" class="text-red-500">{{ store.error }}</p>

    <p v-if="store.loading" class="text-gray-500">Caricamento dati...</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard title="Utenti attivi" icon="👥" :value="store.userCount" />
      <StatsCard title="Ordini Completati" icon="✅" :value="store.orders" />
      <StatsCard title="Guadagni Mensili" icon="💰" :value="'€ ' + store.revenue" />
    </div>
    <div class="mt-6">
      <ChartWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChartWidget from '@/components/ChartWidget.vue'
import StatsCard from '@/components/StatsCard.vue'
import { useDashboardStore } from '@/store/dashboardStore'

const store = useDashboardStore()
</script>
