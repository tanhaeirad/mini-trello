import { useMutation } from '@apollo/client'
import { GET_TASKS } from '../graphql/queries'
import { UPDATE_TASK_ORDER } from '../graphql/mutations'

export const useSwapTaskOrder = (tasks) => {
  const [updateTask] = useMutation(UPDATE_TASK_ORDER, {
    update: (cache, { data: { updateTask } }) => {
      const existingTasks = cache.readQuery({ query: GET_TASKS })

      const newTaskArray = existingTasks.tasks.map((task) => {
        if (task.id === updateTask.task.id) {
          return {
            ...task,
            indexOrder: updateTask.task.indexOrder,
            listId: updateTask.task.listId,
          }
        }
        return task
      })
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: newTaskArray },
      })
    },
  })
  const swapTaskOrder = (activeTask, overTask, isOnDragOver = false) => {
    if (!activeTask || !overTask) return
    if (activeTask.id === overTask.id) return
    if (!isOnDragOver) {
      if (activeTask.listId === overTask.listId) {
        const listId = activeTask.listId
        tasks = tasks.filter((task) => task.listId === listId)

        for (const task of tasks) {
          if (
            activeTask.indexOrder < task.indexOrder &&
            overTask.indexOrder >= task.indexOrder
          ) {
            updateTask({
              variables: {
                id: task.id,
                indexOrder: task.indexOrder - 1,
                listId,
              },
              optimisticResponse: {
                updateTask: {
                  task: {
                    id: task.id,
                    indexOrder: task.indexOrder - 1,
                    listId,
                  },
                },
              },
            })
          }
          if (
            activeTask.indexOrder > task.indexOrder &&
            overTask.indexOrder <= task.indexOrder
          ) {
            updateTask({
              variables: {
                id: task.id,
                indexOrder: task.indexOrder + 1,
                listId,
              },
              optimisticResponse: {
                updateTask: {
                  task: {
                    id: task.id,
                    indexOrder: task.indexOrder + 1,
                    listId,
                  },
                },
              },
            })
          }
        }
        updateTask({
          variables: {
            id: activeTask.id,
            indexOrder: overTask.indexOrder,
            listId,
          },
          optimisticResponse: {
            updateTask: {
              task: {
                id: activeTask.id,
                listId,
                indexOrder: overTask.indexOrder,
              },
            },
          },
        })
        return
      }
    }
    if (isOnDragOver) {
      if (activeTask.listId !== overTask.listId) {
        updateTask({
          variables: {
            id: activeTask.id,
            indexOrder: overTask.indexOrder,
            listId: overTask.listId,
          },
          optimisticResponse: {
            updateTask: {
              task: {
                id: activeTask.id,
                indexOrder: overTask.indexOrder,
                listId: overTask.listId,
              },
            },
          },
        })

        const listId = overTask.listId
        tasks = tasks.filter((task) => task.listId === listId)
        for (const task of tasks) {
          if (task.indexOrder >= overTask.indexOrder) {
            updateTask({
              variables: {
                id: task.id,
                indexOrder: task.indexOrder + 1,
                listId,
              },
              optimisticResponse: {
                updateTask: {
                  task: {
                    id: task.id,
                    indexOrder: task.indexOrder + 1,
                    listId,
                  },
                },
              },
            })
          }
        }

        return
      }
    }
  }

  return swapTaskOrder
}
