import type { Task, TaskFormValues } from '~/types/task'

export function useTasksApi() {
  const listTasks = () => $fetch<Task[]>('/api/tasks')

  const getTask = (id: string) => $fetch<Task>(`/api/tasks/${id}`)

  const createTask = (values: TaskFormValues) =>
    $fetch<Task>('/api/tasks', { method: 'POST', body: values })

  const updateTask = (id: string, values: TaskFormValues) =>
    $fetch<Task>(`/api/tasks/${id}`, { method: 'PUT', body: values })

  const deleteTask = (id: string) =>
    $fetch<{ ok: true }>(`/api/tasks/${id}`, { method: 'DELETE' })

  return { listTasks, getTask, createTask, updateTask, deleteTask }
}
