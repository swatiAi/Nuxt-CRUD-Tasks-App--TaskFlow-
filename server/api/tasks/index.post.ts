import { getAllTasks } from '../../utils/tasksStore'
import type { TaskFormValues } from '~/types/task'

export default defineEventHandler(async (event) => {
  const body = await readBody<TaskFormValues>(event)

  if (!body?.title || body.title.trim().length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title must be at least 3 characters.'
    })
  }

  return createTask({
    title: body.title.trim(),
    description: body.description?.trim() || undefined,
    priority: body.priority ?? 'medium',
    status: body.status ?? 'todo'
  })
})
