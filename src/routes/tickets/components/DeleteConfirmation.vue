<!-- DeleteConfirmation.vue -->
<template>
  <AlertDialogRoot :open="open" @update:open="$emit('update:open', $event)">
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <AlertDialogContent class="bg-white rounded-3xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6">
        <div class="flex flex-col gap-2 text-center sm:text-left">
          <AlertDialogTitle class="text-lg font-semibold">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription class="text-sm text-gray-500">
            This action cannot be undone. This will permanently delete the ticket.
          </AlertDialogDescription>
        </div>
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4">
          <button
            class="rounded-xl border-2 border-green-400 text-green-600 font-semibold px-4 py-2 shadow-md shadow-green-400/20 hover:bg-green-50"
            @click="$emit('update:open', false)"
          >
            Cancel
          </button>
          <button
            class="rounded-xl bg-red-600 text-white font-semibold border-2 border-red-500 shadow-md shadow-red-500/20 hover:bg-red-700 px-4 py-2"
            @click="$emit('confirm')"
          >
            Delete
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from 'radix-vue';

defineProps<{
  open: boolean;
}>();

defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'confirm'): void;
}>();
</script>

<style scoped>
/* Tailwind CSS is used directly in template */
</style>
