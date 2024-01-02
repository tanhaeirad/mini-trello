import { useMutation } from '@apollo/client'
import { UPDATE_TASK_CONTENT } from '../graphql/mutations'
import { GET_DATA } from '../graphql/queries'

export const useUpdateTask = () => {
  const [updateTaskMutation] = useMutation(UPDATE_TASK_CONTENT, {
    update(cache, { data: { updateTask } }) {
      const existingData = cache.readQuery({ query: GET_DATA })

      if (existingData) {
        const updatedTasks = existingData.board.tasks.map((task) =>
          task.id === updateTask.task.id
            ? { ...task, content: updateTask.task.content }
            : task,
        )

        cache.writeQuery({
          query: GET_DATA,
          data: { board: { ...existingData.board, tasks: updatedTasks } },
        })
      }
    },
    optimisticResponse: ({ id, content }) => ({
      updateTask: {
        __typename: 'Task',
        task: { id, content, __typename: 'Task' },
      },
    }),
  })

  const updateTask = (id, content) => {
    updateTaskMutation({ variables: { id, content } })
  }

  return updateTask
}
