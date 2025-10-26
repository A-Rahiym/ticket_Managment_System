<!-- TicketTable.vue -->
<template>
  <div class="bg-white rounded-2xl border border-gray-200/50 shadow-sm">
    <div v-if="tickets.length === 0" class="p-12 text-center">
      <p class="text-gray-500">No tickets found</p>
    </div>
    <div v-else>
      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200/50">
            <tr>
              <th class="text-left p-4 w-12">
                <input
                  type="checkbox"
                  :checked="selectedTickets.size === tickets.length"
                  @change="$emit('toggle-all')"
                  aria-label="Select all tickets"
                  class="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th class="text-left p-4 text-sm font-medium text-gray-500">Title</th>
              <th class="text-left p-4 text-sm font-medium text-gray-500">Assignee</th>
              <th class="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th class="text-left p-4 text-sm font-medium text-gray-500">Priority</th>
              <th class="text-left p-4 text-sm font-medium text-gray-500">Created</th>
              <th class="text-left p-4 w-12"></th>
            </tr>
          </thead>
          <tbody>
            <TicketRow
              v-for="ticket in tickets"
              :key="ticket.id"
              :ticket="ticket"
              :is-selected="selectedTickets.has(ticket.id)"
              :is-row-selected="selectedRow === ticket.id"
              @toggle-selection="$emit('toggle-ticket', ticket.id)"
              @edit="$emit('edit', ticket)"
              @delete="$emit('delete', ticket.id)"
              @row-click="$emit('row-click', ticket.id)"
            />
          </tbody>
        </table>
      </div>
      <!-- Mobile Cards -->
      <div class="block md:hidden p-4 flex flex-col gap-4">
        <TicketRow
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          :is-selected="selectedTickets.has(ticket.id)"
          :is-row-selected="selectedRow === ticket.id"
          @toggle-selection="$emit('toggle-ticket', ticket.id)"
          @edit="$emit('edit', ticket)"
          @delete="$emit('delete', ticket.id)"
          @row-click="$emit('row-click', ticket.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TicketRow from './TicketRow.vue';
import type {Ticket}  from '@/types/ticket';

defineProps<{
  tickets: Ticket[];
  selectedTickets: Set<string>;
  selectedRow: string | null;
}>();

defineEmits<{
  (e: 'toggle-all'): void;
  (e: 'toggle-ticket', id: string): void;
  (e: 'row-click', id: string): void;
  (e: 'edit', ticket: Ticket): void;
  (e: 'delete', id: string): void;
}>();
</script>

<style scoped>
/* Tailwind CSS is used directly in template */
</style>
