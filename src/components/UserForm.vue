<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDashboardStore } from '@/store/dashboardStore'

const store = useDashboardStore()
const props = defineProps<{ selectedUser: User | null }>()
const emit = defineEmits(['close'])

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

const saveUser = () => {
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
      <input
        v-model="userForm.name"
        type="text"
        placeholder="Nome"
        class="w-full p-2 mb-2 border rounded"
      />
      <input
        v-model="userForm.email"
        type="email"
        placeholder="Email"
        class="w-full p-2 mb-2 border rounded"
      />

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
