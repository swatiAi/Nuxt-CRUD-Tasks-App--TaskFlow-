<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Tasks</h2>

      <NuxtLink
        to="/tasks/new"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium
               hover:bg-blue-700 transition"
      >
        + New Task
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-gray-500">
      Loading tasks...
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!tasks.length"
      class="border rounded-xl p-6 text-center text-gray-500"
    >
      No tasks yet. Create your first one.
    </div>

    <!-- Task List -->
    <div v-else class="space-y-4">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="border rounded-xl p-4 bg-white flex justify-between items-start"
      >
        <div>
          <NuxtLink
            :to="`/tasks/${task.id}`"
            class="font-semibold text-lg hover:text-blue-600"
          >
            {{ task.title }}
          </NuxtLink>

          <p class="text-sm text-gray-500 mt-1">
            Status: {{ task.status }} | Priority: {{ task.priority }}
          </p>
        </div>

        <button
          @click="deleteTask(task.id)"
          class="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)

const { tasks, seedIfEmpty, deleteTask } = useTasks()

onMounted(() => {
  setTimeout(() => {
    seedIfEmpty()
    isLoading.value = false
  }, 400)
})
</script>