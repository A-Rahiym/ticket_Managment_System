<template>
  <textarea
    v-bind="$attrs"
    :class="textareaClass"
    data-slot="textarea"
  ></textarea>
</template>

<script setup lang="ts">
import { computed } from "vue"

// Equivalent of React’s `cn` function — merges classes safely
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  class?: string
}

const props = defineProps<Props>()

const textareaClass = computed(() =>
  cn(
    "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    props.class
  )
)
</script>

<style scoped>
/* You can customize textarea styles here if needed */
</style>
