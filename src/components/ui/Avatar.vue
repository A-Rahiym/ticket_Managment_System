<template>
  <div
    data-slot="avatar"
    :class="avatarClass"
    v-bind="$attrs"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      data-slot="avatar-image"
      :class="imageClass"
      @error="onError"
    />
    <div
      v-else
      data-slot="avatar-fallback"
      :class="fallbackClass"
    >
      <slot name="fallback">
        {{ fallbackText }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

// Class name combiner like the `cn()` utility in React
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  src?: string
  alt?: string
  fallbackText?: string
  class?: string
  imageClass?: string
  fallbackClass?: string
}

const props = defineProps<Props>()

const hasError = ref(false)

function onError() {
  hasError.value = true
}

const avatarClass = computed(() =>
  cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", props.class)
)

const imageClass = computed(() =>
  cn("aspect-square size-full object-cover", props.imageClass)
)

const fallbackClass = computed(() =>
  cn("bg-muted flex size-full items-center justify-center rounded-full text-sm text-muted-foreground", props.fallbackClass)
)

const src = computed(() => (hasError.value ? undefined : props.src))
</script>

<style scoped>
/* Optional: You can adjust these tokens based on your theme */
.bg-muted {
  background-color: #e5e7eb;
}
.text-muted-foreground {
  color: #6b7280;
}
</style>
