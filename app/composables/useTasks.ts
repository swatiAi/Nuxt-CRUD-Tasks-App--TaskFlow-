import type { Task, TaskFormValues } from '~/types/task'

function makeId() {
  return crypto.randomUUID()
}

export function useTasks() {
  const tasks = useState<Task[]>('tasks', () => [])
  if (import.meta.client) {
  const saved = localStorage.getItem('tasks')
  if (saved && tasks.value.length === 0) {
    tasks.value = JSON.parse(saved)
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

  function addTask(values: TaskFormValues) {
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

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function getTaskById(id: string) {
    return tasks.value.find(t => t.id === id)
  }

  return { tasks, seedIfEmpty, addTask, deleteTask, getTaskById }
}
