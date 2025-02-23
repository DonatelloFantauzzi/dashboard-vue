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
  const userCount = computed(() => users.value.length)

  const fetchUser = async (): Promise<void> => {
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

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
  }

  onMounted(() => {
    fetchUser()
  })

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
    fetchUser,
    toggleTheme,
  }
})
