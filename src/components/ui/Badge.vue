<template>
  <component
    :is="asChild ? 'slot' : 'span'"
    data-slot="badge"
    :class="[
      'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0',
      '[&>svg]:size-3 [&>svg]:pointer-events-none',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      'transition-[color,box-shadow]',
      {
        'border-transparent bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90': variant === 'secondary',
        'border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60': variant === 'destructive',
        'text-foreground hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      },
      className,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  asChild?: boolean
  className?: string
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<style scoped>
/* Scoped styles if needed */
</style>
