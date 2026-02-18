import { getAllTasks } from '../../utils/tasksStore'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  const task = getTask(id)

  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  return task
})
