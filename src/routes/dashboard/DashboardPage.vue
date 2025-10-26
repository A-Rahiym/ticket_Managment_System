<template>
  <div class="min-h-screen px-6 py-12">
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10"
    />
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <h2
          class="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-3xl font-semibold"
          id="dashboard-heading"
        >
          Dashboard
        </h2>
        <p class="text-muted-foreground">
          Overview of your ticket management system
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        role="region"
        aria-labelledby="dashboard-heading"
      >
        <StatsCard
          :icon="TicketIcon"
          label="Total"
          :value="stats.total"
          bgColor="bg-gradient-to-br from-primary to-accent"
          borderColor="border-[hsl(var(--neon-green))]/20"
          hoverBorderColor="hover:border-[hsl(var(--neon-green))]/40"
          badgeColor="bg-primary/10 text-primary hover:bg-primary/20"
          textColor="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        />
        <StatsCard
          :icon="AlertCircle"
          label="Open"
          :value="stats.open"
          bgColor="bg-gradient-to-br from-green-400 to-green-600"
          borderColor="border-[hsl(var(--neon-green))]/20"
          hoverBorderColor="hover:border-[hsl(var(--neon-green))]/40"
          badgeColor="bg-green-100 text-green-700 hover:bg-green-200"
          textColor="text-green-600"
        />
        <StatsCard
          :icon="Clock"
          label="In Progress"
          :value="stats.inProgress"
          bgColor="bg-gradient-to-br from-amber-400 to-amber-600"
          borderColor="border-[hsl(var(--neon-green))]/20"
          hoverBorderColor="hover:border-[hsl(var(--neon-green))]/40"
          badgeColor="bg-amber-100 text-amber-700 hover:bg-amber-200"
          textColor="text-amber-600"
        />
        <StatsCard
          :icon="CheckCircle2"
          label="Resolved"
          :value="stats.resolved"
          bgColor="bg-gradient-to-br from-gray-400 to-gray-600"
          borderColor="border-[hsl(var(--neon-green))]/20"
          hoverBorderColor="hover:border-[hsl(var(--neon-green))]/40"
          badgeColor="bg-gray-100 text-gray-700 hover:bg-gray-200"
          textColor="text-gray-600"
        />
      </div>
      <QuickActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Ticket as TicketIcon, AlertCircle, Clock, CheckCircle2 } from 'lucide-vue-next'
import StatsCard from './components/StatsCard.vue'
import QuickActions from './components/QuickActions.vue'
import { useTicketStore } from '../../context/ticket'

const ticketStore = useTicketStore()

const stats = computed(() => ({
  total: ticketStore.tickets.length,
  open: ticketStore.tickets.filter((t) => t.status === 'open').length,
  inProgress: ticketStore.tickets.filter((t) => t.status === 'in_progress').length,
  resolved: ticketStore.tickets.filter((t) => t.status === 'closed').length,
}))
</script>

<style scoped>
/* Scoped styles if needed */
</style>
