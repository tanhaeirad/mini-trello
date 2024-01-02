import { useMutation, gql } from '@apollo/client'
import { DELETE_TASK } from '../graphql/mutations'

export const useDeleteTask = () => {
  const [deleteTaskMutation] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      if (deleteTask.ok) {
        cache.modify({
          fields: {
            board(existingBoardData, { readField }) {
              const currentTasks = existingBoardData.tasks

              const updatedTasks = currentTasks.filter(
                (taskRef) => readField('id', taskRef) !== deleteTask.id,
              )
              return { ...existingBoardData, tasks: updatedTasks }
            },
          },
        })
      }
    },
    optimisticResponse: ({ id }) => ({
      deleteTask: {
        id,
        ok: true,
      },
    }),
  })

  const deleteTask = (id) => {
    deleteTaskMutation({ variables: { id } })
  }

  return deleteTask
}
