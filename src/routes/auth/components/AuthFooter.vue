<template>
  <div class="mt-6 text-center">
    <p class="text-sm text-muted-foreground">
      {{ mode === 'login' ? "Don't have an account? " : "Already have an account? " }}
      <RouterLink
        :to="mode === 'login' ? '/signup' : '/login'"
        class="text-primary font-medium hover:underline"
      >
        {{ mode === 'login' ? 'Sign up' : 'Sign in' }}
      </RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  mode: 'login' | 'signup'
}>()
</script>

<style scoped>
/* Scoped styles if needed */
</style>
