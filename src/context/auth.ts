import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { mockLogin, mockSignup } from '../mock/mockApi'

interface User {
  email: string
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuthenticated = ref<boolean>(false)
  const user = ref<User | null>(null)

  // Initialize from localStorage
  const session = localStorage.getItem('ticketapp_session')
  if (session) {
    try {
      const { user: storedUser } = JSON.parse(session)
      isAuthenticated.value = true
      user.value = storedUser
    } catch (error) {
      console.error('Failed to parse session:', error)
      localStorage.removeItem('ticketapp_session')
    }
  }

  async function handleAuthSuccess(email: string, password: string, name?: string) {
    try {
      const { token, user: userData } = name
        ? await mockSignup(email, password, name)
        : await mockLogin(email, password)
      localStorage.setItem('ticketapp_session', JSON.stringify({ token, user: userData }))
      isAuthenticated.value = true
      user.value = userData
      toast.success(name ? 'Signup successful!' : 'Login successful!', {
        position: 'top-right',
        autoClose: 10000,
      })
      router.replace('/dashboard')
    } catch (error) {
      toast.error(
        name ? 'Signup failed. Please try again.' : 'Invalid credentials. Please try again.',
        {
          position: 'top-right',
          autoClose: 10000,
        },
      )
      throw error
    }
  }

  function handleLogout() {
    localStorage.removeItem('ticketapp_session')
    isAuthenticated.value = false
    user.value = null
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 10000,
    })
    router.replace('/login')
  }

  return { isAuthenticated, user, handleAuthSuccess, handleLogout }
})
