import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_TASK } from '../graphql/mutations'
import { GET_DATA } from '../graphql/queries'

export const useCreateTask = () => {
  const client = useApolloClient()
  const [createTaskMutation] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      const existingData = cache.readQuery({ query: GET_DATA })
      if (existingData) {
        const updatedTasks = [...existingData.board.tasks, createTask.task]
        cache.writeQuery({
          query: GET_DATA,
          data: {
            board: {
              ...existingData.board,
              tasks: updatedTasks,
            },
          },
        })
      }
    },
  })

  const createTask = (id, listId) => {
    const existingTasks = client.readQuery({ query: GET_DATA })
    const tasks = existingTasks?.board?.tasks?.filter(
      (task) => task.listId === listId,
    )
    const maxIndexOrder =
      tasks?.reduce((max, list) => Math.max(list.indexOrder, max), 0) || 0
    const newIndexOrder = maxIndexOrder + 1
    const content = `New Card ${tasks?.length + 1 || 1}`

    createTaskMutation({
      variables: { id, content, listId, indexOrder: newIndexOrder },
      optimisticResponse: {
        createTask: {
          task: {
            __typename: 'Task',
            id,
            content,
            indexOrder: newIndexOrder,
            listId,
          },
        },
      },
    })
  }

  return createTask
}
