# Nuxt CRUD Tasks App (TaskFlow)

A simple CRUD web app built with **Nuxt 4**, **Vue 3 (Composition API)**, **TypeScript**, and **Tailwind CSS**.
Includes a small **Nitro server API** for tasks and a clean **dark UI theme**.

App runs at:
UI: http://localhost:3000/tasks
API: http://localhost:3000/api/tasks

## Features
- List tasks (cards)
- View single task details
- Create task
- Edit task
- Delete task
- Loading, error, and empty states
- Basic validation (client + server)

## Tech Stack
- Nuxt 4
- Vue 3 (Composition API)
- Tailwind CSS
- TypeScript
- Nitro Server API (`server/api`)

## Project Structure (important parts)
- `app/pages/tasks/` — UI pages (list, create, details, edit)
- `app/components/tasks/TaskForm.vue` — reusable form component
- `app/composables/useTasksApi.ts` — API wrapper using `$fetch`
- `server/api/tasks/` — API routes (GET/POST/PUT/DELETE)
- `server/utils/tasksStore.ts` — in-memory store (for demo/training)

## Setup
```bash
npm install
npm run dev
