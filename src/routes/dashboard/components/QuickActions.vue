<template>
  <div
    class="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/10 rounded-3xl p-4 sm:p-6 md:p-8 border border-[hsl(var(--neon-green))] shadow-md shadow-[hsl(var(--neon-green))]/20"
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
      <div>
        <h3
          class="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
        >
          Ready to manage tickets?
        </h3>
        <p class="text-base sm:text-lg text-muted-foreground/80">
          Create, update, and track all your support tickets in one place
        </p>
      </div>
      <RouterLink to="/tickets">
        <Button
          variant="neon"
          size="default"
          class="rounded-full px-6 sm:px-8 text-sm sm:text-base text-white font-semibold border-2 border-[hsl(var(--neon-green))] btn-hover-scale"
          aria-label="View all tickets"
        >
          View All Tickets
          <ArrowRight class="ml-2 w-4 h-4 arrow-hover" />
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { ArrowRight } from 'lucide-vue-next'
</script>

<style scoped>
/* Scoped styles if needed */
</style>
