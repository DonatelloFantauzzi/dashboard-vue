<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ title: string; icon: string; value: string | number }>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-4 flex items-center">
    <div class="text-3xl mr-4">{{ props.icon }}</div>
    <div>
      <h2 class="text-lg font-semibold">{{ props.title }}</h2>
      <p class="text-xl font-bold">{{ props.value }}</p>
    </div>
  </div>
</template>
