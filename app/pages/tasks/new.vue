<template>
  <div class="max-w-2xl">
    <div class="mb-6">
      <NuxtLink
        to="/tasks"
        class="inline-flex items-center text-sm text-slate-400 hover:text-slate-200 transition"
      >
        ← Back to tasks
      </NuxtLink>

      <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
        Create
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
          New Task
        </span>
      </h2>
      <p class="mt-1 text-sm text-slate-400">
        Add a task with priority and status. Keep it simple and clear.
      </p>
    </div>

    <TaskForm
      submit-label="Create Task"
      :is-submitting="isSubmitting"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { TaskFormValues } from '~/types/task'
import TaskForm from '~/components/tasks/TaskForm.vue'

const api = useTasksApi()
const isSubmitting = ref(false)

async function onSubmit(values: TaskFormValues) {
  isSubmitting.value = true
  try {
    const created = await api.createTask(values)
    await navigateTo(`/tasks/${created.id}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>
