<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDashboardStore } from '@/store/dashboardStore'

const store = useDashboardStore()
const props = defineProps<{ selectedUser: User | null }>()
const emit = defineEmits(['close'])
const isSubmitting = ref<boolean>(false)

const userForm = ref({
  id: null as number | null,
  name: '',
  email: '',
})

// Se viene selezionato un utente, aggiorniamo il form
watch(
  () => props.selectedUser,
  (newUser) => {
    if (newUser) {
      userForm.value = { ...newUser }
    } else {
      userForm.value = { id: null, name: '', email: '' }
    }
  },
  { immediate: true },
)

const errors = computed(() => {
  return {
    name: isSubmitting.value && userForm.value.name.trim() === '' ? 'Il nome è obbligatorio' : '',
    email:
      isSubmitting.value && !userForm.value.email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
        ? 'Email non valida'
        : '',
  }
})

const saveUser = () => {
  isSubmitting.value = true
  if (errors.value.name || errors.value.email) return // Se ci sono errori, blocchiamo il salvataggio
  if (userForm.value.id) {
    store.updateUser(userForm.value)
  } else {
    store.addUser({ ...userForm.value, id: Date.now() })
  }
  emit('close') // Chiude il form
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">{{ userForm.id ? 'Modifica' : 'Aggiungi' }} Utente</h2>

      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700">Nome</label>
        <input v-model="userForm.name" class="w-full p-2 border rounded-lg" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="userForm.email" class="w-full p-2 border rounded-lg" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <div class="flex justify-between mt-4">
        <button @click="emit('close')" class="px-4 py-2 bg-gray-400 text-white rounded">
          Annulla
        </button>
        <button @click="saveUser" class="px-4 py-2 bg-blue-500 text-white rounded">
          {{ userForm.id ? 'Aggiorna' : 'Aggiungi' }}
        </button>
      </div>
    </div>
  </div>
</template>
