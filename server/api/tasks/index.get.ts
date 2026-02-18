import { getAllTasks } from '../../utils/tasksStore'

export default defineEventHandler(() => {
  return getAllTasks()
})
