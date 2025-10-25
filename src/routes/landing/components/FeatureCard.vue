<template>
  <div
    class="group p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <div
      :class="`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`"
    >
      <component :is="icon" class="w-7 h-7 text-white" />
    </div>
    <h3 class="mb-3 text-lg sm:text-xl font-semibold">{{ title }}</h3>
    <p class="text-muted-foreground text-base">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Component } from 'vue'

defineProps<{
  icon: Component
  title: string
  description: string
  gradient: string
}>()
</script>

<style scoped>
/* Scoped styles if needed */
</style>
