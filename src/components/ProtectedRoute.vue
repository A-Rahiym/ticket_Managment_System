<template>
  <slot v-if="authStore.isAuthenticated"/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../context/auth'
import { toast } from 'vue3-toastify'
import { watchEffect } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

watchEffect(() => {
  if (!authStore.isAuthenticated) {
    toast.error('Please log in to access this page.', {
      position: 'top-right',
      autoClose: 3000,
    })
    router.replace('/login')
  }
})
</script>

<style scoped>
/* No styles needed as this is a wrapper component */
</style>
