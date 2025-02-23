<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDashboardStore } from '@/store/dashboardStore'
import UserForm from '@/components/UserForm.vue'

const store = useDashboardStore()
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 5
const selectedUser = ref<User | null>(null)
const showForm = ref(false)

const filteredUsers = computed(() => {
  return store.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const openForm = (user: User | null = null) => {
  selectedUser.value = user
  showForm.value = true
}
</script>

<template>
  <div class="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-gray-700 dark:text-white mb-4">👥 Lista Utenti</h2>

    <!-- Pulsante Aggiungi Utente -->
    <button @click="openForm()" class="mb-4 px-4 py-2 bg-green-500 text-white rounded">
      ➕ Aggiungi Utente
    </button>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="🔍 Cerca utente..."
      class="w-full p-2 mb-4 border rounded"
    />

    <table class="w-full border-collapse border">
      <thead class="bg-gray-200 dark:bg-gray-700">
        <tr>
          <th class="p-2 text-left">ID</th>
          <th class="p-2 text-left">Nome</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id" class="border-t">
          <td class="p-2">{{ user.id }}</td>
          <td class="p-2">{{ user.name }}</td>
          <td class="p-2">{{ user.email }}</td>
          <td class="p-2">
            <button @click="openForm(user)" class="px-2 py-1 bg-yellow-500 text-white rounded">
              ✏ Modifica
            </button>
            <button
              @click="store.deleteUser(user.id)"
              class="px-2 py-1 bg-red-500 text-white rounded ml-2"
            >
              🗑 Elimina
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
      >
        ◀ Precedente
      </button>
      <span class="text-gray-700 dark:text-white"
        >Pagina {{ currentPage }} di {{ totalPages }}</span
      >
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
      >
        Successivo ▶
      </button>
    </div>

    <p v-if="filteredUsers.length === 0" class="text-gray-500 mt-2">Nessun utente trovato.</p>

    <!-- Form per Aggiungere/Modificare Utenti -->
    <UserForm v-if="showForm" :selectedUser="selectedUser" @close="showForm = false" />
  </div>
</template>
