<template>
  <component
    :is="tag"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'neon'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  tag?: string
  className?: string
}>()

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all'
 const variants: Record<
  'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'neon',
  string
> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'underline-offset-4 hover:underline text-primary',
  neon: 'bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-[hsl(var(--neon-green))] shadow-lg shadow-[hsl(var(--neon-green))]/20',
}
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3',
    lg: 'h-10 px-6',
    icon: 'h-9 w-9',
  }
  return [base, variants[props.variant || 'default'], sizes[props.size || 'default'], props.className].join(' ')
})

// Default to 'button' if tag is not provided
const tag = computed(() => props.tag || 'button')


</script>
