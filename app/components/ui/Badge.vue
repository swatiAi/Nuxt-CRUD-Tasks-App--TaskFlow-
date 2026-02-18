<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold
           ring-1 ring-inset backdrop-blur"
    :class="classes"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'slate' | 'blue' | 'green' | 'amber' | 'red' | 'purple'
}>()

const classes = computed(() => {
  switch (props.variant) {
    case 'blue':
      return 'bg-blue-500/15 text-blue-200 ring-blue-400/30'
    case 'green':
      return 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/30'
    case 'amber':
      return 'bg-amber-500/15 text-amber-200 ring-amber-400/30'
    case 'red':
      return 'bg-rose-500/15 text-rose-200 ring-rose-400/30'
    case 'purple':
      return 'bg-violet-500/15 text-violet-200 ring-violet-400/30'
    default:
      return 'bg-slate-500/15 text-slate-200 ring-slate-400/30'
  }
})
</script>
