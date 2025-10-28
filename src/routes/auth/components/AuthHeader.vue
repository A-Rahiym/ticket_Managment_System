<template>
  <div class="text-center mb-8">
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

defineProps<{
  mode: 'login' | 'signup'
}>()
</script>

<style scoped>
</style>
