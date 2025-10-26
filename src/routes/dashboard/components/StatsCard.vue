<template>
  <div
    :class="`bg-card rounded-2xl p-6 border ${borderColor} shadow-sm hover:shadow-lg ${hoverBorderColor} transition-all`"
    role="group"
    :aria-label="`${label} ticket statistics`"
  >
    <div class="flex items-center justify-between mb-4">
      <div :class="`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`">
        <component :is="icon" class="w-5 h-5 text-white" />
      </div>
      <Badge :class="`rounded-full ${badgeColor}`">
        {{ label }}
      </Badge>
    </div>
    <div class="space-y-1">
      <p :class="`text-3xl font-bold ${textColor}`">
        {{ value }}
      </p>
      <p class="text-sm text-muted-foreground">
        {{ label === 'Total' ? 'Total Tickets' : label === 'Open' ? 'Open Tickets' : label === 'In Progress' ? 'In Progress' : 'Resolved' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Badge from '@/components/ui/Badge.vue'
import { Ticket, AlertCircle, Clock, CheckCircle2 } from 'lucide-vue-next'

defineProps<{
  icon: typeof Ticket | typeof AlertCircle | typeof Clock | typeof CheckCircle2
  label: string
  value: number
  bgColor: string
  borderColor: string
  hoverBorderColor: string
  badgeColor: string
  textColor: string
}>()
</script>

<style scoped>
/* Scoped styles if needed */
</style>
