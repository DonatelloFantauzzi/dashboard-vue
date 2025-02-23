import { defineStore } from 'pinia'
import { ref, watch, onMounted, computed } from 'vue'

type User = {
  id: number
  name: string
  email: string
}

export const useDashboardStore = defineStore('dashboard', () => {
  const users = ref<User[]>([])
  const orders = ref<number>(200)
  const revenue = ref<number>(1500)
  const loading = ref<boolean>(false)
  const error = ref<'string' | null>(null)
  const theme = ref<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
  )
  const notification = ref<{ message: string; type: 'success' | 'error' } | null>(null)

  const userCount = computed(() => users.value.length)

  const loadUser = () => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
    }
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    notification.value = { message, type }
    setTimeout(() => {
      notification.value = null
    }, 3000)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const fetchUser = async (): Promise<void> => {
    if (users.value.length) return
    loading.value = true
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Errore nella richiesta')
      users.value = await response.json()
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const addUser = (user: User) => {
    users.value.push(user)
    showNotification('Utente aggiunto', 'success')
  }

  function updateUser(updatedUser: User) {
    const index = users.value.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
    showNotification('Utente aggiornato', 'success')
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
  }

  const deleteUser = (id: number) => {
    users.value = users.value.filter((user) => user.id !== id)
    showNotification('Utente eliminato', 'success')
  }

  onMounted(() => {
    loadUser()
    fetchUser()
  })

  watch(users, saveToLocalStorage, { deep: true })

  // carichiamo il tema quando l'applicazione viene avviata
  watch(
    theme,
    (newTheme) => {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    },
    { immediate: true },
  )

  return {
    users,
    theme,
    orders,
    revenue,
    loading,
    error,
    userCount,
    notification,
    fetchUser,
    toggleTheme,
    deleteUser,
    addUser,
    updateUser,
    loadUser,
    showNotification,
  }
})
