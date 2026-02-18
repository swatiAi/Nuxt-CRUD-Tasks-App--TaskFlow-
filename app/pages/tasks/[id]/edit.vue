<template>
  <!-- Loading -->
  <div
    v-if="pending"
    class="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-slate-300 shadow-sm"
  >
    <div class="flex items-center gap-3">
      <span class="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse"></span>
      Loading…
    </div>
  </div>

  <!-- Error -->
  <div
    v-else-if="error"
    class="rounded-2xl border border-rose-900/50 bg-rose-950/40 p-6 text-rose-200"
  >
    <div class="font-semibold">Task not found.</div>
    <p class="text-sm text-rose-200/80 mt-1">
      The task may have been deleted or the ID is incorrect.
    </p>

    <NuxtLink
      to="/tasks"
      class="mt-4 inline-flex items-center rounded-xl border border-slate-800 bg-slate-900/30 px-4 py-2
             text-sm font-semibold text-slate-200 hover:bg-slate-900/60 transition"
    >
      ← Back to tasks
    </NuxtLink>
  </div>

  <!-- Form -->
  <div v-else-if="task" class="max-w-2xl">
    <div class="mb-6">
      <NuxtLink
        :to="`/tasks/${id}`"
        class="inline-flex items-center text-sm text-slate-400 hover:text-slate-200 transition"
      >
        ← Back to details
      </NuxtLink>

      <h2 class="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
        Edit
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
          Task
        </span>
      </h2>
      <p class="mt-1 text-sm text-slate-400">
        Update the task details and save your changes.
      </p>
    </div>

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
</template>

<script setup lang="ts">
import type { TaskFormValues } from '~/types/task'
import TaskForm from '~/components/tasks/TaskForm.vue'

const route = useRoute()
const api = useTasksApi()

const id = computed(() => route.params.id as string)

const { data: task, pending, error, refresh } = await useAsyncData(
  () => `edit-task-${id.value}`,
  () => api.getTask(id.value),
  { watch: [id] }
)

const isSubmitting = ref(false)

async function onSubmit(values: TaskFormValues) {
  isSubmitting.value = true
  try {
    await api.updateTask(id.value, values)
    await refresh()
    await navigateTo(`/tasks/${id.value}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>
