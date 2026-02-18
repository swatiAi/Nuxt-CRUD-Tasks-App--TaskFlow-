<template>
  <!-- Loading -->
  <div
    v-if="pending"
    class="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-slate-300 shadow-sm"
  >
    <div class="flex items-center gap-3">
      <span class="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse"></span>
      Loading task…
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

  <!-- Content -->
  <div v-else-if="task" class="max-w-2xl">
    <div class="mb-6">
      <NuxtLink
        to="/tasks"
        class="inline-flex items-center text-sm text-slate-400 hover:text-slate-200 transition"
      >
        ← Back to tasks
      </NuxtLink>

      <div class="mt-3 flex items-start justify-between gap-4">
        <div class="min-w-0">
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50 break-words">
            {{ task.title }}
          </h2>

          <div class="mt-3 flex flex-wrap items-center gap-2">
            <Badge :variant="statusVariant(task.status)">{{ prettyStatus(task.status) }}</Badge>
            <Badge :variant="priorityVariant(task.priority)">{{ prettyPriority(task.priority) }}</Badge>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <NuxtLink
            :to="`/tasks/${task.id}/edit`"
            class="inline-flex items-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-950
                   hover:bg-blue-400 transition ring-1 ring-blue-300/20"
          >
            Edit
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center rounded-xl border border-rose-900/50 bg-rose-950/30 px-4 py-2
                   text-sm font-semibold text-rose-200 hover:bg-rose-950/50 transition"
            @click="onDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 shadow-sm">
      <div class="text-sm font-semibold text-slate-200 mb-2">Description</div>
      <p class="text-slate-300 leading-relaxed">
        {{ task.description || 'No description provided.' }}
      </p>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500">
        <div class="rounded-xl border border-slate-800 bg-slate-950/30 p-3">
          <div class="font-semibold text-slate-400">Created</div>
          <div class="mt-1 font-mono">{{ task.createdAt }}</div>
        </div>
        <div class="rounded-xl border border-slate-800 bg-slate-950/30 p-3">
          <div class="font-semibold text-slate-400">Updated</div>
          <div class="mt-1 font-mono">{{ task.updatedAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '~/components/ui/Badge.vue'

const route = useRoute()
const api = useTasksApi()

const id = computed(() => route.params.id as string)

const { data: task, pending, error } = await useAsyncData(
  () => `task-${id.value}`,
  () => api.getTask(id.value),
  { watch: [id] }
)

async function onDelete() {
  await api.deleteTask(id.value)
  await navigateTo('/tasks')
}

function prettyStatus(s: string) {
  if (s === 'in_progress') return 'In progress'
  if (s === 'done') return 'Done'
  return 'To do'
}

function prettyPriority(p: string) {
  if (p === 'high') return 'High priority'
  if (p === 'low') return 'Low priority'
  return 'Medium priority'
}

function statusVariant(s: string) {
  if (s === 'done') return 'green'
  if (s === 'in_progress') return 'blue'
  return 'slate'
}

function priorityVariant(p: string) {
  if (p === 'high') return 'red'
  if (p === 'low') return 'amber'
  return 'purple'
}
</script>
