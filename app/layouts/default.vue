<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <!-- Subtle background glow -->
    <div class="pointer-events-none fixed inset-0 opacity-40">
      <div class="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full blur-3xl bg-blue-500/20"></div>
      <div class="absolute top-40 right-10 h-72 w-72 rounded-full blur-3xl bg-violet-500/15"></div>
    </div>

    <header class="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/tasks" class="group inline-flex items-center gap-2">
          <span
            class="inline-flex h-8 w-8 items-center justify-center rounded-xl
                   bg-gradient-to-br from-blue-500/30 to-violet-500/30 ring-1 ring-white/10"
          >
            <span class="text-sm font-bold text-slate-100">TF</span>
          </span>

          <span class="font-semibold tracking-tight text-lg text-slate-50 group-hover:text-white">
            TaskFlow
          </span>
        </NuxtLink>

        <div class="hidden sm:block text-xs text-slate-400">
          Nuxt 4 • Vue 3 • Tailwind
        </div>
      </div>
    </header>

    <main class="relative mx-auto max-w-5xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
