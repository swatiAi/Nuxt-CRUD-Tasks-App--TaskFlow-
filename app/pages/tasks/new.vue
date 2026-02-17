<template>
  <div class="max-w-2xl">
    <h2 class="text-2xl font-semibold mb-2">Create Task</h2>
    <p class="text-gray-600 mb-6">Add a new task to your list.</p>

    <TasksTaskForm
      submit-label="Create"
      :is-submitting="isSubmitting"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { TaskFormValues } from '~/types/task'

const isSubmitting = ref(false)
const { addTask } = useTasks()

async function onSubmit(values: TaskFormValues) {
  isSubmitting.value = true
  try {
    addTask(values)
    await navigateTo('/tasks')
  } finally {
    isSubmitting.value = false
  }
}
</script>
