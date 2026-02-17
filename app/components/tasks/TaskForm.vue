<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm font-medium mb-1">Title</label>
      <input
        v-model="form.title"
        type="text"
        class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g., Finish Nuxt CRUD task"
      />
      <p v-if="errors.title" class="text-sm text-red-600 mt-1">{{ errors.title }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea
        v-model="form.description"
        rows="4"
        class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Optional details..."
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Priority</label>
        <select
          v-model="form.priority"
          class="w-full rounded-lg border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Status</label>
        <select
          v-model="form.status"
          class="w-full rounded-lg border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>

    <div class="flex gap-3">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium
               hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {{ submitLabel }}
      </button>

      <NuxtLink
        to="/tasks"
        class="inline-flex items-center rounded-lg border px-4 py-2 font-medium text-gray-700
               hover:bg-gray-50 transition"
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
