<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ message: string; type: 'success' | 'error' }>()
const visible = ref<boolean>(false)

onMounted(() => {
  visible.value = true
  console.log('mounted')
  setTimeout(() => {
    visible.value = false
  }, 3000)
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-4 right-4 px-4 py-2 rounded-lg text-white shadow-lg transition-all duration-300"
    :class="props.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
  >
    {{ props.message }}
  </div>
</template>
