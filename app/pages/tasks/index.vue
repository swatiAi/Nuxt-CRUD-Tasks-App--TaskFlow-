<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
          Tasks
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
            Dashboard
          </span>
        </h2>
        <p class="text-sm text-slate-400 mt-1">
          Manage tasks with API-backed CRUD (Nuxt server routes).
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div
          class="hidden sm:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-xs text-slate-400"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-400/80"></span>
          API connected
        </div>

        <NuxtLink
          to="/tasks/new"
          class="inline-flex items-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-950
                 hover:bg-blue-400 transition shadow-sm shadow-blue-500/10 ring-1 ring-blue-300/20"
        >
          + New Task
        </NuxtLink>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="pending"
      class="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-slate-300 shadow-sm"
    >
      <div class="flex items-center gap-3">
        <span class="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse"></span>
        Loading tasks…
      </div>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="rounded-2xl border border-rose-900/50 bg-rose-950/40 p-6 text-rose-200"
    >
      <div class="font-semibold">Failed to load tasks.</div>
      <p class="text-sm text-rose-200/80 mt-1">
        Check your API routes: <span class="font-mono">/api/tasks</span>
      </p>
    </div>

    <!-- Empty -->
    <div
      v-else-if="!tasks?.length"
      class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center shadow-sm"
    >
      <div class="text-xl font-semibold text-slate-50">No tasks yet</div>
      <p class="mt-2 text-slate-400">Create your first task to get moving.</p>

      <NuxtLink
        to="/tasks/new"
        class="mt-6 inline-flex items-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-950
               hover:bg-blue-400 transition ring-1 ring-blue-300/20"
      >
        + New Task
      </NuxtLink>
    </div>

    <!-- List -->
    <div v-else class="space-y-4">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="group rounded-2xl border border-slate-800 bg-slate-900/30 p-5 shadow-sm
               hover:bg-slate-900/50 hover:border-slate-700 transition"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <NuxtLink
              :to="`/tasks/${task.id}`"
              class="block text-lg font-semibold tracking-tight text-slate-50
                     group-hover:text-white transition"
            >
              {{ task.title }}
            </NuxtLink>

            <div class="mt-2 flex flex-wrap items-center gap-2">
              <Badge :variant="statusVariant(task.status)">
                {{ prettyStatus(task.status) }}
              </Badge>

              <Badge :variant="priorityVariant(task.priority)">
                {{ prettyPriority(task.priority) }}
              </Badge>
            </div>
          </div>

          <button
            @click="onDelete(task.id)"
            class="text-sm font-semibold text-rose-300 hover:text-rose-200
                   rounded-lg px-2 py-1 hover:bg-rose-500/10 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '~/components/ui/Badge.vue'

const api = useTasksApi()

const { data: tasks, pending, error, refresh } = await useAsyncData('tasks', () =>
  api.listTasks()
)

async function onDelete(id: string) {
  await api.deleteTask(id)
  await refresh()
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
