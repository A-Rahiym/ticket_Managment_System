// src/stores/ticket.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { toast } from 'vue3-toastify';
import type { Ticket } from '../types/ticket';
import { createTicket, updateTicket, deleteTicket } from '../mock/mockApi';
import { initialTickets } from '../mock/mock';

export const useTicketStore = defineStore('ticket', () => {
  // State
  const tickets = ref<Ticket[]>(initialTickets);

  // Getters
  const openTicketCount = computed(() => tickets.value.filter(t => t.status === 'open').length);
  const inProgressTicketCount = computed(() => tickets.value.filter(t => t.status === 'in_progress').length);
  const closedTicketCount = computed(() => tickets.value.filter(t => t.status === 'closed').length);

  // Actions
  async function handleCreateTicket(ticket: Omit<Ticket, 'id'>) {
    try {
      const newTicket = await createTicket(ticket);
      tickets.value = [newTicket, ...tickets.value]; // Ensure reactive update
      toast.success('Ticket created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to create ticket. Please retry.', {
        position: 'top-right',
        autoClose: 3000,
      });
      throw error;
    }
  }

  async function handleUpdateTicket(id: string, updatedTicket: Omit<Ticket, 'id'>) {
    try {
      await updateTicket(id, updatedTicket);
      tickets.value = tickets.value.map((ticket) =>
        ticket.id === id ? { ...updatedTicket, id } : ticket
      ); // Ensure reactive update
      toast.success('Ticket updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to update ticket. Please retry.', {
        position: 'top-right',
        autoClose: 3000,
      });
      throw error;
    }
  }

  async function handleDeleteTicket(id: string) {
    try {
      await deleteTicket(id);
      tickets.value = tickets.value.filter((ticket) => ticket.id !== id); // Ensure reactive update
      toast.success('Ticket deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to delete ticket. Please retry.', {
        position: 'top-right',
        autoClose: 3000,
      });
      throw error;
    }
  }

  return {
    tickets,
    openTicketCount,
    inProgressTicketCount,
    closedTicketCount,
    handleCreateTicket,
    handleUpdateTicket,
    handleDeleteTicket,
  };
});
