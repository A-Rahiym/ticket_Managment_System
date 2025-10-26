<template>
  <CheckboxGroup v-slot="{ checked }">
    <slot name="checkbox-root" :checked="checked">
      <Checkbox
        v-bind="$attrs"
        :class="[
          'peer border bg-input-background dark:bg-input/30 data-[checked=true]:bg-primary data-[checked=true]:text-primary-foreground data-[checked=true]:border-primary',
          'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        ]"
      >
        <slot name="checkbox-indicator" :checked="checked">
          <CheckIcon v-if="checked" class="size-3.5 text-current" />
        </slot>
      </Checkbox>
    </slot>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { useId } from '@headlessui/vue'

defineProps<{
  modelValue?: boolean
  className?: string
}>()
const id = useId()
</script>

<style scoped>
/* Scoped styling to ensure visual alignment with form elements */
</style>
