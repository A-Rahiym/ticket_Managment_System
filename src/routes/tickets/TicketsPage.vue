<!-- TicketsPage.vue -->
<template>
  <div class="min-h-screen px-6 py-12">
    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-white -z-10"></div>
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h2
            class="mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent text-3xl font-semibold"
            id="tickets-heading"
          >
            Tickets
          </h2>
          <p class="text-gray-500">Manage and track all support tickets</p>
        </div>
        <div class="flex gap-4">
          <button
            v-if="selectedTickets.size > 0"
            class="rounded-full border-2 border-red-500 bg-red-600 text-white font-semibold px-4 py-2 shadow-md shadow-red-500/20 hover:bg-red-700 transition-all"
            @click="handleBulkDelete"
          >
            <svg class="w-4 h-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-10 5v10a2 2 0 002 2h6a2 2 0 002-2V11M10 11v6m4-6v6" />
            </svg>
            Delete Selected ({{ selectedTickets.size }})
          </button>
          <button
            class="rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold border-2 border-purple-400 shadow-lg shadow-purple-400/40 transition-all duration-300 hover:scale-105 px-4 py-2"
            @click="isCreateModalOpen = true"
          >
            <svg class="w-4 h-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14m-7-7h14" />
            </svg>
            New Ticket
          </button>
        </div>
      </div>

      
      <TicketFilters
        :search-query="searchQuery"
        :status-filter="statusFilter"
        @update:search-query="setSearchQuery"
        @update:status-filter="setStatusFilter"
      />

      <div role="region" aria-labelledby="tickets-heading">
        <TicketTable
          :tickets="filteredTickets"
          :selected-tickets="selectedTickets"
          :selected-row="selectedRow"
          @toggle-all="toggleAllTickets"
          @toggle-ticket="toggleTicketSelection"
          @row-click="setSelectedRow"
          @edit="setEditingTicket"
          @delete="id => (deletingTickets = [id])"
        />
      </div>

      <TicketFormModal
        :open="isCreateModalOpen"
        @update:open="isCreateModalOpen = $event"
        :ticket="null"
        @submit="handleCreateSubmit"
      />

      <TicketFormModal
        :open="!!editingTicket"
        @update:open="open => !open && (editingTicket = null)"
        :ticket="editingTicket"
        @submit="handleUpdateSubmit"
      />

      <DeleteConfirmation
        :open="!!deletingTickets"
        @update:open="open => !open && (deletingTickets = null)"
        @confirm="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { toast } from 'vue3-toastify';
import TicketFilters from './components/TicketFilters.vue';
import TicketTable from './components/TicketTable.vue';
import TicketFormModal from './components/TicketFormModal.vue';
import DeleteConfirmation from './components/DeleteConfirmation.vue';
import { useTicketStore } from '@/context/ticket';
import type { Ticket } from '@/types/ticket';

const store = useTicketStore();
const { tickets } = store; // Direct access, preserves reactivity
const searchQuery = ref('');
const statusFilter = ref('all');
const selectedTickets = ref(new Set<string>());
const selectedRow = ref<string | null>(null);
const isCreateModalOpen = ref(false);
const editingTicket = ref<Ticket | null>(null);
const deletingTickets = ref<string[] | null>(null);

// Debug reactivity
watch(tickets, (newTickets) => {
  console.log('Tickets updated:', newTickets);
}, { deep: true });

const filteredTickets = computed(() => {
  return tickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.assignee.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const toggleTicketSelection = (id: string) => {
  const newSelection = new Set(selectedTickets.value);
  if (newSelection.has(id)) {
    newSelection.delete(id);
  } else {
    newSelection.add(id);
  }
  selectedTickets.value = newSelection;
};

const toggleAllTickets = () => {
  if (selectedTickets.value.size === filteredTickets.value.length) {
    selectedTickets.value = new Set();
  } else {
    selectedTickets.value = new Set(filteredTickets.value.map(t => t.id));
  }
};

const setSearchQuery = (value: string) => {
  searchQuery.value = value;
};

const setStatusFilter = (value: string) => {
  statusFilter.value = value;
};

const setSelectedRow = (id: string) => {
  selectedRow.value = id;
};

const setEditingTicket = (ticket: Ticket) => {
  editingTicket.value = ticket;
};

const handleCreateSubmit = (data: Omit<Ticket, 'id' | 'createdAt'>) => {
  store.handleCreateTicket({
    ...data,
    createdAt: new Date().toISOString(),
  });
};

const handleUpdateSubmit = (data: Omit<Ticket, 'id' | 'createdAt'>) => {
  if (editingTicket.value) {
    store.handleUpdateTicket(editingTicket.value.id, {
      ...data,
      createdAt: editingTicket.value.createdAt,
    });
    editingTicket.value = null;
  }
};

const handleDelete = () => {
  if (deletingTickets.value) {
    try {
      deletingTickets.value.forEach(id => store.handleDeleteTicket(id));
      deletingTickets.value = null;
      selectedTickets.value = new Set();
    } catch (error) {
      toast.error('Failed to delete ticket(s). Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }
};

const handleBulkDelete = () => {
  deletingTickets.value = Array.from(selectedTickets.value);
};
</script>

<style scoped>
/* Tailwind CSS is used directly in template */
</style>
