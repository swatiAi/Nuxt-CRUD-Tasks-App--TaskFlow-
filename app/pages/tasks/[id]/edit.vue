<template>
  <div v-if="isReady && task" class="max-w-2xl">
    <h2 class="text-2xl font-semibold mb-2">Edit Task</h2>
    <p class="text-gray-600 mb-6">Update the task details.</p>

    <TaskForm
      :initial-values="{
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
      }"
      submit-label="Save Changes"
      :is-submitting="isSubmitting"
      @submit="onSubmit"
    />
  </div>


  <div v-else-if="!isReady" class="text-gray-500">
    Loading...
  </div>

  <div v-else class="text-center py-12 text-gray-500">
    Task not found.
  </div>
</template>

<script setup lang="ts">
import type { TaskFormValues } from '~/types/task'
import TaskForm from '~/components/tasks/TaskForm.vue'

const route = useRoute()
const { getTaskById, updateTask, seedIfEmpty, tasks } = useTasks()

const id = computed(() => route.params.id as string)

const isReady = ref(false)

onMounted(() => {
  seedIfEmpty()
  isReady.value = true
})

const task = computed(() => getTaskById(id.value))

const isSubmitting = ref(false)

async function onSubmit(values: TaskFormValues) {
  isSubmitting.value = true
  try {
    const updated = updateTask(id.value, values)
    if (updated) {
      await navigateTo(`/tasks/${id.value}`)
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
