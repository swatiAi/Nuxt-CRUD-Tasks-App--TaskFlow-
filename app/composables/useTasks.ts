import type { Task, TaskFormValues } from '~/types/task'

function makeId() {
  return crypto.randomUUID()
}

function isTask(value: any): value is Task {
  return (
    value &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    (value.description === undefined || typeof value.description === 'string') &&
    typeof value.priority === 'string' &&
    typeof value.status === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string'
  )
}

export function useTasks() {
  const tasks = useState<Task[]>('tasks', () => [])

  // Persist to localStorage (client only)
  if (import.meta.client) {
    const saved = localStorage.getItem('tasks')

    if (saved && tasks.value.length === 0) {
      try {
        const parsed: unknown = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          tasks.value = parsed.filter(isTask)
        }
      } catch {
        // ignore invalid storage
      }
    }

    watch(
      tasks,
      (val) => localStorage.setItem('tasks', JSON.stringify(val)),
      { deep: true }
    )
  }

  function seedIfEmpty() {
    if (tasks.value.length) return
    const now = new Date().toISOString()
    tasks.value = [
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

  function addTask(values: TaskFormValues): Task {
    const now = new Date().toISOString()
    const newTask: Task = {
      id: makeId(),
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      createdAt: now,
      updatedAt: now
    }
    tasks.value = [newTask, ...tasks.value]
    return newTask
  }

  function updateTask(id: string, values: TaskFormValues): Task | null {
    const now = new Date().toISOString()

    const idx = tasks.value.findIndex((t) => t.id === id)
    if (idx === -1) return null

    const existing = tasks.value[idx] as Task

    const updated: Task = {
      ...existing,
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      updatedAt: now
    }

    const copy = [...tasks.value]
    copy[idx] = updated
    tasks.value = copy

    return updated
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function getTaskById(id: string): Task | undefined {
    return tasks.value.find((t) => t.id === id)
  }

  return {
    tasks,
    seedIfEmpty,
    addTask,
    updateTask,
    deleteTask,
    getTaskById
  }
}
