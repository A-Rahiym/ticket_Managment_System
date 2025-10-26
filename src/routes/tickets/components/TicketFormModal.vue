<template>
  <DialogRoot :open="open" @update:open="handleClose">
    <DialogPortal>
      <!-- Overlay -->
      <DialogOverlay class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      <!-- Modal -->
      <DialogContent
        class="bg-white rounded-3xl max-w-md sm:max-w-lg md:max-w-2xl w-[90%] p-4 sm:p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               shadow-2xl animate-in fade-in z-50"
      >
        <!-- Header -->
        <DialogTitle class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          {{ ticket ? 'Edit Ticket' : 'Create New Ticket' }}
        </DialogTitle>

        <!-- Form Fields -->
        <div class="space-y-4 sm:space-y-5">
          <!-- Title -->
          <div>
            <label for="title" class="text-xs sm:text-sm font-medium text-gray-700">Title *</label>
            <input
              id="title"
              type="text"
              v-model="formData.title"
              :class="[
                'mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl w-full border px-3 focus:outline-none focus:ring-2',
                errors.title ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-400'
              ]"
              placeholder="Enter ticket title"
              :aria-invalid="!!errors.title"
              :aria-describedby="errors.title ? 'title-error' : undefined"
            />
            <p v-if="errors.title" id="title-error" class="text-xs text-red-500 mt-1">{{ errors.title }}</p>
          </div>

          <!-- Assignee -->
          <div>
            <label for="assignee" class="text-xs sm:text-sm font-medium text-gray-700">Assignee *</label>
            <input
              id="assignee"
              type="text"
              v-model="formData.assignee"
              :class="[
                'mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl w-full border px-3 focus:outline-none focus:ring-2',
                errors.assignee ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-400'
              ]"
              placeholder="Enter assignee name"
              :aria-invalid="!!errors.assignee"
              :aria-describedby="errors.assignee ? 'assignee-error' : undefined"
            />
            <p v-if="errors.assignee" id="assignee-error" class="text-xs text-red-500 mt-1">{{ errors.assignee }}</p>
          </div>

          <!-- Status & Priority -->
          <div class="flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label for="status" class="text-xs sm:text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                v-model="formData.status"
                class="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl w-full border border-gray-300 px-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Resolved</option>
              </select>
            </div>

            <div>
              <label for="priority" class="text-xs sm:text-sm font-medium text-gray-700">Priority</label>
              <select
                id="priority"
                v-model="formData.priority"
                class="mt-1 sm:mt-1.5 h-10 sm:h-11 rounded-xl w-full border border-gray-300 px-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="text-xs sm:text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="mt-1 sm:mt-1.5 rounded-xl h-24 sm:h-32 w-full border border-gray-300 px-3 py-2
                     focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 resize-none"
              placeholder="Enter ticket description (optional)"
              rows="4"
            ></textarea>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <button
            class="rounded-xl border-2 border-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))] font-semibold px-4 py-2
                   shadow-md shadow-[hsl(var(--neon-green))]/20 hover:bg-[hsl(var(--neon-green))]/10 transition-all duration-300"
            @click="handleClose"
          >
            Cancel
          </button>

          <button
            class="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold border-2 border-purple-400
                   shadow-lg shadow-purple-400/40 transition-all duration-300 hover:scale-105 px-4 py-2"
            @click="handleSubmit"
          >
            {{ ticket ? 'Update' : 'Create' }}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle } from 'radix-vue';
import type { Ticket } from '@/types/ticket';

const props = defineProps<{
  open: boolean;
  ticket: Ticket | null;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'submit', data: Omit<Ticket, 'id' | 'createdAt'>): void;
}>();

const formData = ref({
  title: '',
  status: 'open' as 'open' | 'in_progress' | 'closed',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  assignee: '',
});

const errors = ref<{ title?: string; assignee?: string }>({});

watch(() => props.ticket, (ticket) => {
  if (ticket) {
    formData.value = {
      title: ticket.title,
      status: ticket.status,
      description: ticket.description,
      priority: ticket.priority,
      assignee: ticket.assignee,
    };
  } else {
    resetForm();
  }
});

const resetForm = () => {
  formData.value = {
    title: '',
    status: 'open',
    description: '',
    priority: 'medium',
    assignee: '',
  };
  errors.value = {};
};

const validateForm = () => {
  const newErrors: { title?: string; assignee?: string } = {};
  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required';
  } else if (formData.value.title.length < 3) {
    newErrors.title = 'Title must be at least 3 characters';
  }
  if (!formData.value.assignee.trim()) {
    newErrors.assignee = 'Assignee is required';
  }
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', formData.value);
    emit('update:open', false);
    resetForm();
  }
};

const handleClose = () => {
  emit('update:open', false);
  resetForm();
};
</script>
