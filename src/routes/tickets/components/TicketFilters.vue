<!-- TicketFilters.vue -->
<template>
  <div class="bg-white rounded-2xl border border-gray-200/50 shadow-sm mb-6">
    <div class="p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1 relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            :value="searchQuery"
            @input="$emit('update:search-query', $event.target.value)"
            placeholder="Search tickets..."
            class="pl-10 h-10 rounded-xl w-full border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>
        <div class="flex gap-2 bg-gray-100/50 p-1 rounded-xl">
          <button
            v-for="status in ['all', 'open', 'in_progress', 'closed']"
            :key="status"
            :class="[
              'px-4 py-2 rounded-lg text-sm transition-all',
              statusFilter === status ? 'bg-white shadow-sm font-medium' : 'text-gray-500 hover:text-gray-900'
            ]"
            @click="$emit('update:status-filter', status)"
          >
            {{ status === 'all' ? 'All' : status === 'open' ? 'Open' : status === 'in_progress' ? 'In Progress' : 'Closed' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string;
  statusFilter: string;
}>();

defineEmits<{
  (e: 'update:search-query', value: string): void;
  (e: 'update:status-filter', value: string): void;
}>();
</script>

<style scoped>
/* Tailwind CSS is used directly in template */
</style>
