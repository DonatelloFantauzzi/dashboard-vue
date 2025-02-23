<script setup lang="ts">
import { useDashboardStore } from '@/store/dashboardStore'

const dashboardStore = useDashboardStore()
</script>

<template>
  <button
    @click="dashboardStore.toggleTheme"
    class="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:cursor-pointer"
  >
    <span v-if="dashboardStore.theme === 'light'">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>
