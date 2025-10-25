<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Full Name (Signup only) -->
    <div v-if="mode === 'signup'">
      <label for="name" class="text-sm font-medium">Full Name</label>
      <input
        id="name"
        type="text"
        v-model="formData.name"
        :class="`mt-1.5 h-11 w-full rounded-xl border px-3 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`"
        placeholder="John Doe"
        :aria-invalid="errors.name ? 'true' : 'false'"
        :aria-describedby="errors.name ? 'name-error' : undefined"
      />
      <p v-if="errors.name" id="name-error" class="text-red-500 mt-1.5 text-sm">
        {{ errors.name }}
      </p>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="text-sm font-medium">Email address</label>
      <input
        id="email"
        type="email"
        v-model="formData.email"
        :class="`mt-1.5 h-11 w-full rounded-xl border px-3 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`"
        placeholder="you@example.com"
        :aria-invalid="errors.email ? 'true' : 'false'"
        :aria-describedby="errors.email ? 'email-error' : undefined"
      />
      <p v-if="errors.email" id="email-error" class="text-red-500 mt-1.5 text-sm">
        {{ errors.email }}
      </p>
    </div>

    <!-- Password -->
    <div>
      <label for="password" class="text-sm font-medium">Password</label>
      <input
        id="password"
        type="password"
        v-model="formData.password"
        :class="`mt-1.5 h-11 w-full rounded-xl border px-3 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`"
        placeholder="Enter your password"
        :aria-invalid="errors.password ? 'true' : 'false'"
        :aria-describedby="errors.password ? 'password-error' : undefined"
      />
      <p v-if="errors.password" id="password-error" class="text-red-500 mt-1.5 text-sm">
        {{ errors.password }}
      </p>
    </div>

    <!-- Confirm Password (Signup only) -->
    <div v-if="mode === 'signup'">
      <label for="confirmPassword" class="text-sm font-medium">Confirm password</label>
      <input
        id="confirmPassword"
        type="password"
        v-model="formData.confirmPassword"
        :class="`mt-1.5 h-11 w-full rounded-xl border px-3 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`"
        placeholder="Confirm your password"
        :aria-invalid="errors.confirmPassword ? 'true' : 'false'"
        :aria-describedby="errors.confirmPassword ? 'confirm-password-error' : undefined"
      />
      <p
        v-if="errors.confirmPassword"
        id="confirm-password-error"
        class="text-red-500 mt-1.5 text-sm"
      >
        {{ errors.confirmPassword }}
      </p>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-500/40 transition-all duration-300 hover:scale-105"
    >
      {{ mode === 'login' ? 'Sign In' : 'Create Account' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '../../../context/auth'

const props = defineProps<{
  mode: 'login' | 'signup'
}>()

const authStore = useAuthStore()

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
})

const errors = ref<{
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
}>({})

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm() {
  console.log('🔍 Validating form...', formData.value)
  const newErrors: typeof errors.value = {}

  if (!formData.value.email) {
    newErrors.email = 'Email is required'
  } else if (!validateEmail(formData.value.email)) {
    newErrors.email = 'Invalid email format'
  }

  if (!formData.value.password) {
    newErrors.password = 'Password is required'
  } else if (formData.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  if (props.mode === 'signup' && !formData.value.name) {
    newErrors.name = 'Name is required'
  }

  if (props.mode === 'signup' && formData.value.password !== formData.value.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  errors.value = newErrors
  console.log('✅ Validation errors:', newErrors)
  return Object.keys(newErrors).length === 0
}

async function handleSubmit() {
  console.log('🚀 Submitting form...', formData.value)
  if (validateForm()) {
    try {
      console.log('📡 Sending auth request...', {
        email: formData.value.email,
        password: formData.value.password,
        name: formData.value.name,
        mode: props.mode,
      })

      await authStore.handleAuthSuccess(
        formData.value.email,
        formData.value.password,
        props.mode === 'signup' ? formData.value.name : undefined,
      )

      console.log('✅ Auth success!')
    } catch (error) {
      console.error('❌ Auth error:', error)
      toast.error('Authentication failed. Please try again.', {
        position: 'top-right',
        autoClose: 10000,
      })
    }
  } else {
    console.warn('⚠️ Form validation failed:', errors.value)
    toast.error('Please check your inputs and try again.', {
      position: 'top-right',
      autoClose: 10000,
    })
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #7c3aed; /* Purple-600 */
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.3);
}
</style>
