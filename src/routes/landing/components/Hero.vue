<template>
  <section
    class="relative flex flex-col items-center justify-center min-h-screen px-6 py-24 overflow-hidden text-center"
    role="region"
    aria-label="Hero section"
  >
    <!-- Gradient background -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10"
    />

    <!-- Glow effect -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[hsl(var(--neon-green))]/5 blur-3xl rounded-full -z-10"
    />

    <div class="max-w-4xl mx-auto relative z-10">
      <div
        class="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
      >
        <span class="text-sm font-medium text-primary"> Welcome to Modern Support </span>
      </div>

      <h1
        class="text-4xl sm:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Streamline Your Support with Smart Ticket Management
      </h1>
      <p class="max-w-2xl mx-auto mb-10 text-base sm:text-lg text-muted-foreground">
        Manage customer inquiries efficiently with our intuitive ticket system. Track, prioritize,
        and resolve issues faster than ever before.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <RouterLink to="/signup">
          <button
            class="rounded-full px-8 py-3 text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold border-2 border-[hsl(var(--neon-green))] transform transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto"
            aria-label="Get started with TicketFlow"
          >
            Get Started
            <ArrowRight class="ml-2 w-4 h-4" />
          </button>
        </RouterLink>

        <RouterLink to="/login">
          <button
            class="rounded-full px-8 py-3 text-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold border-2 border-[hsl(var(--neon-green))] transform transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto"
            aria-label="Sign in to TicketFlow"
          >
            Sign In
          </button>
        </RouterLink>
      </div>
    </div>
    <WaveBackground />
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import WaveBackground from '@/components/common/WaveBackground.vue'
</script>

<style scoped>
/* Scoped styles if needed */
</style>
