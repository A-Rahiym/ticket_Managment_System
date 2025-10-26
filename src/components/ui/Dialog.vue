<template>
  <Dialog as="div" class="relative z-50" v-slot="{ open }">
    <slot name="trigger" />

    <DialogPanel
      v-if="open"
      class="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        class="bg-background relative z-50 w-full max-w-lg rounded-2xl border p-6 shadow-xl animate-in fade-in-0 zoom-in-95"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <slot name="header">
              <DialogTitle class="text-lg font-semibold leading-none">
                <slot name="title" />
              </DialogTitle>
              <DialogDescription class="text-sm text-muted-foreground">
                <slot name="description" />
              </DialogDescription>
            </slot>
          </div>

          <!-- ✅ Manual close button -->
          <button
            @click="emit('update:open', false)"
            class="rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <XIcon class="w-5 h-5" />
            <span class="sr-only">Close</span>
          </button>
        </div>

        <!-- ✅ Dialog Body -->
        <div class="space-y-4">
          <slot />
        </div>

        <!-- ✅ Dialog Footer -->
        <div class="mt-6 flex flex-col sm:flex-row justify-end gap-2">
          <slot name="footer" />
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";
import { XIcon } from "lucide-vue-next";

const emit = defineEmits(["update:open"]);
</script>

<style scoped>
/* Optional fade animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-in {
  animation: fade-in 0.2s ease-out;
}
</style>
