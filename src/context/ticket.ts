import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { Ticket } from '../types/ticket'
import { createTicket, updateTicket, deleteTicket } from '../mock/mockApi'
import { initialTickets } from '../mock/mock'

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<Ticket[]>(initialTickets)

  async function handleCreateTicket(ticket: Omit<Ticket, 'id'>) {
    try {
      const newTicket = await createTicket(ticket)
      tickets.value = [newTicket, ...tickets.value]
      toast.success('Ticket created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      })
    } catch (error) {
      toast.error('Failed to create ticket. Please retry.', {
        position: 'top-right',
        autoClose: 3000,
      })
      throw error
    }
  }

  async function handleUpdateTicket(id: string, updatedTicket: Omit<Ticket, 'id'>) {
    try {
      await updateTicket(id, updatedTicket)
      tickets.value = tickets.value.map((ticket) =>
        ticket.id === id ? { ...updatedTicket, id } : ticket
      )
      toast.success('Ticket updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      })
    } catch (error) {
      toast.error('Failed to update ticket. Please retry.', {
        position: 'top-right',
        autoClose: 3000,
      })
      throw error
    }
  }

  async function handleDeleteTicket(id: string) {
    try {
      await deleteTicket()
      tickets.value = tickets.value.filter((ticket) => ticket.id !== id)
      toast.success('Ticket deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      })
    } catch (error) {
      toast.error('Failed to delete ticket. Please retry.', {
        position: 'top-right',
        autoClose: 3000,
      })
      throw error
    }
  }

  return { tickets, handleCreateTicket, handleUpdateTicket, handleDeleteTicket }
})
