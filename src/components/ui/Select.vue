<template>
  <Listbox v-slot="{ open }">
    <slot name="trigger" :open="open" />
    <ListboxOptions
      v-bind="$attrs"
      :class="[
        'bg-popover text-popover-foreground relative z-50 rounded-md border shadow-md overflow-y-auto',
        open ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out-95',
        position === 'popper' && 'min-w-[var(--radix-select-trigger-width)]',
        className,
      ]"
    >
      <slot name="content" />
    </ListboxOptions>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
  ListboxOptionIndicator,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-vue-next'

defineProps<{
  className?: string
  size?: 'sm' | 'default'
  position?: 'popper' | string
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<style scoped>
/* Optional scoped styles for custom look */
</style>
