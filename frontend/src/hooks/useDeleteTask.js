import { useMutation, gql } from '@apollo/client'
import { DELETE_TASK } from '../graphql/mutations'

export const useDeleteTask = () => {
  const [deleteTaskMutation] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      if (deleteTask.ok) {
        cache.modify({
          fields: {
            tasks(existingTaskRefs, { readField }) {
              return existingTaskRefs.filter(
                (taskRef) => readField('id', taskRef) !== deleteTask.id,
              )
            },
          },
        })
      }
    },
    optimisticResponse: ({ id }) => ({
      deleteTask: {
        __typename: 'Task',
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
