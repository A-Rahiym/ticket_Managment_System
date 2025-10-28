<template>
  <div
    class="min-h-screen flex items-center justify-center px-6 py-20"
    role="region"
    aria-label="Authentication page"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10"
    />
    <div class="w-full max-w-md">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 group"
        aria-label="Back to home"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </RouterLink>
      <div class="bg-card rounded-3xl border border-border/50 shadow-lg p-8">
        <AuthHeader :mode="mode" />
        <AuthForm :mode="mode" />
        <AuthFooter :mode="mode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import AuthHeader from './components/AuthHeader.vue'
import AuthForm from './components/AuthForm.vue'
import AuthFooter from './components/AuthFooter.vue'
import { ArrowLeft } from 'lucide-vue-next'

defineProps<{
  mode: 'login' | 'signup'
}>()
</script>
<style scoped>
/* Scoped styles if needed */
</style>
