<template>
  <div v-if="task" class="max-w-2xl">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-2xl font-semibold">
          {{ task.title }}
        </h2>
        <p class="text-gray-500 text-sm mt-1">
          Status: {{ task.status }} | Priority: {{ task.priority }}
        </p>
      </div>

      <NuxtLink
        :to="`/tasks/${task.id}/edit`"
        class="text-blue-600 text-sm hover:underline"
      >
        Edit
      </NuxtLink>
    </div>

    <div class="border rounded-xl p-4 bg-white">
      <p class="text-gray-700">
        {{ task.description || 'No description provided.' }}
      </p>
    </div>

    <div class="mt-6">
      <NuxtLink
        to="/tasks"
        class="text-sm text-gray-600 hover:underline"
      >
        ← Back to tasks
      </NuxtLink>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="text-center py-12 text-gray-500">
    Task not found.
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getTaskById } = useTasks()

const task = computed(() => {
  const id = route.params.id as string
  return getTaskById(id)
})
</script>
