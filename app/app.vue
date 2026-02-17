<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task'

const task: Task = { id: '1', title: 'Test' }
</script>
