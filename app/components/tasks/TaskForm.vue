<template>
  <form
    class="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 shadow-sm space-y-5"
    @submit.prevent="handleSubmit"
  >
    <!-- Title -->
    <div>
      <label class="block text-sm font-semibold text-slate-200 mb-1">Title</label>
      <input
        v-model="form.title"
        type="text"
        class="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100
               placeholder:text-slate-500
               focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition"
        placeholder="e.g., Finish Nuxt CRUD task"
      />
      <p v-if="errors.title" class="text-sm text-rose-300 mt-2">
        {{ errors.title }}
      </p>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-semibold text-slate-200 mb-1">Description</label>
      <textarea
        v-model="form.description"
        rows="4"
        class="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100
               placeholder:text-slate-500
               focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition"
        placeholder="Optional details…"
      />
      <p class="text-xs text-slate-500 mt-2">
        Keep it short. Future-you will thank present-you.
      </p>
    </div>

    <!-- Priority + Status -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-semibold text-slate-200 mb-1">Priority</label>
        <select
          v-model="form.priority"
          class="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100
                 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition"
        >
          <option class="bg-slate-950" value="low">Low</option>
          <option class="bg-slate-950" value="medium">Medium</option>
          <option class="bg-slate-950" value="high">High</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold text-slate-200 mb-1">Status</label>
        <select
          v-model="form.status"
          class="w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100
                 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition"
        >
          <option class="bg-slate-950" value="todo">To do</option>
          <option class="bg-slate-950" value="in_progress">In progress</option>
          <option class="bg-slate-950" value="done">Done</option>
        </select>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="inline-flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-950
               hover:bg-blue-400 transition shadow-sm shadow-blue-500/10 ring-1 ring-blue-300/20
               disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">{{ submitLabel }}</span>
        <span v-else class="inline-flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-slate-950 animate-pulse"></span>
          Saving…
        </span>
      </button>

      <NuxtLink
        to="/tasks"
        class="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/30 px-4 py-2
               text-sm font-semibold text-slate-200 hover:bg-slate-900/60 transition"
      >
        Cancel
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { TaskFormValues } from '~/types/task'

const props = withDefaults(
  defineProps<{
    initialValues?: Partial<TaskFormValues>
    submitLabel?: string
    isSubmitting?: boolean
  }>(),
  {
    submitLabel: 'Save',
    isSubmitting: false
  }
)

const emit = defineEmits<{
  (e: 'submit', values: TaskFormValues): void
}>()

const form = reactive<TaskFormValues>({
  title: props.initialValues?.title ?? '',
  description: props.initialValues?.description ?? '',
  priority: props.initialValues?.priority ?? 'medium',
  status: props.initialValues?.status ?? 'todo'
})

watch(
  () => props.initialValues,
  (val) => {
    if (!val) return
    form.title = val.title ?? ''
    form.description = val.description ?? ''
    form.priority = val.priority ?? 'medium'
    form.status = val.status ?? 'todo'
  },
  { deep: true, immediate: true }
)

const errors = reactive<{ title?: string }>({})

function validate(): boolean {
  errors.title = undefined

  const title = form.title.trim()
  if (!title) {
    errors.title = 'Title is required.'
    return false
  }
  if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters.'
    return false
  }
  return true
}

function handleSubmit() {
  if (!validate()) return

  emit('submit', {
    title: form.title.trim(),
    description: form.description?.trim() || undefined,
    priority: form.priority,
    status: form.status
  })
}
</script>
