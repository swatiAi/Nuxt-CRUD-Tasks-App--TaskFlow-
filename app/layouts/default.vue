<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Navbar -->
    <header class="border-b bg-white">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">
          Nuxt CRUD App
        </h1>

        <nav class="space-x-4">
          <NuxtLink
            to="/tasks"
            class="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Tasks
          </NuxtLink>

          <NuxtLink
            to="/tasks/new"
            class="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            New Task
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Page Content -->
    <main class="max-w-5xl mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>
