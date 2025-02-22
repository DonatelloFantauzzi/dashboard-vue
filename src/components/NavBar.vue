<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between">
    <h2 class="text-lg font-bold">Dashboard</h2>
    <ThemeToggle />
    <div>
      <router-link to="/" class="px-3">🏠 Home</router-link>
      <router-link to="/settings" class="px-3">⚙️ Settings</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>
