import type { Task, TaskFormValues } from '~/types/task'


let tasks: Task[] = []

function nowIso() {
  return new Date().toISOString()
}

function seedIfEmpty() {
  if (tasks.length) return
  const now = nowIso()
  tasks = [
    {
      id: '1',
      title: 'Finish Nuxt assignment',
      description: 'Complete CRUD app properly',
      priority: 'high',
      status: 'in_progress',
      createdAt: now,
      updatedAt: now
    },
    {
      id: '2',
      title: 'Push to GitHub',
      priority: 'medium',
      status: 'todo',
      createdAt: now,
      updatedAt: now
    }
  ]
}

export function getAllTasks() {
  seedIfEmpty()
  return tasks
}

export function getTask(id: string) {
  seedIfEmpty()
  return tasks.find(t => t.id === id)
}

export function createTask(values: TaskFormValues): Task {
  seedIfEmpty()
  const now = nowIso()

  const id =
    globalThis.crypto?.randomUUID?.() ?? String(Date.now())

  const task: Task = {
    id,
    title: values.title,
    description: values.description,
    priority: values.priority,
    status: values.status,
    createdAt: now,
    updatedAt: now
  }

  tasks = [task, ...tasks]
  return task
}

export function updateTask(id: string, values: TaskFormValues): Task | null {
  seedIfEmpty()

  const idx = tasks.findIndex(t => t.id === id)
  if (idx === -1) return null

  const existing = tasks[idx]
  if (!existing) return null

  const updated: Task = {
    id: existing.id,
    createdAt: existing.createdAt,
    title: values.title,
    description: values.description,
    priority: values.priority,
    status: values.status,
    updatedAt: nowIso()
  }

  const copy = [...tasks]
  copy[idx] = updated
  tasks = copy

  return updated
}


export function deleteTask(id: string) {
  seedIfEmpty()
  const before = tasks.length
  tasks = tasks.filter(t => t.id !== id)
  return tasks.length !== before
}
