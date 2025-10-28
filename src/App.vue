<template>
  <div class="bg-background min-h-screen">
    <Navbar v-if="authStore.isAuthenticated" />
    <main role="main" class="max-w-7xl mx-auto px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './store/auth'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()
</script>

<style scoped>
/* Scoped styles if needed */
</style>
