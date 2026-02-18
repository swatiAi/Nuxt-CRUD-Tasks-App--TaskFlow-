import { getAllTasks } from '../../utils/tasksStore'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  const ok = deleteTask(id)

  if (!ok) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  return { ok: true }
})
