<script setup lang="ts">
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from 'radix-vue'

import Button from './Button.vue'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (val: boolean) => void
  className?: string
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
}>()
</script>

<template>
  <AlertDialogRoot
    :open="props.open"
    :defaultOpen="props.defaultOpen"
    @update:open="emit('update:open', $event)"
    class="relative"
  >
    <AlertDialogTrigger asChild>
      <slot name="trigger" />
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out"
      />
      <AlertDialogContent
        class="bg-background fixed top-1/2 left-1/2 z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        <div class="flex flex-col gap-2 text-center sm:text-left">
          <AlertDialogTitle class="text-lg font-semibold">
            <slot name="title" />
          </AlertDialogTitle>
          <AlertDialogDescription class="text-muted-foreground text-sm">
            <slot name="description" />
          </AlertDialogDescription>
        </div>

        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline" class="rounded-xl">
              <slot name="cancel">Cancel</slot>
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" class="rounded-xl">
              <slot name="action">Confirm</slot>
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style scoped>
/* optional extra styles */
</style>
