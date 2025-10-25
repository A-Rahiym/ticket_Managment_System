<template>
  <div class="text-center mb-8">
    <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
      <Ticket class="w-8 h-8 text-white" />
    </div>
    <h2 class="mb-2 text-2xl font-semibold">
      {{ mode === 'login' ? 'Welcome back' : 'Create account' }}
    </h2>
    <p class="text-muted-foreground">
      {{ mode === 'login' ? 'Sign in to continue to your dashboard' : 'Get started with TicketFlow today' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Ticket } from 'lucide-vue-next'

defineProps<{
  mode: 'login' | 'signup'
}>()
</script>

<style scoped>
/* Scoped styles if needed */
</style>
