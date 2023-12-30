import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_TASK } from '../graphql/mutations'
import { GET_TASKS } from '../graphql/queries'

export const useCreateTask = () => {
  const client = useApolloClient()
  const [createTaskMutation] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      const existingTasks = cache.readQuery({ query: GET_TASKS })
      if (existingTasks) {
        cache.writeQuery({
          query: GET_TASKS,
          data: { tasks: [...existingTasks.tasks, createTask.task] },
        })
      }
    },
  })

  const createTask = (id, listId) => {
    const existingTasks = client.readQuery({ query: GET_TASKS })
    const tasks = existingTasks?.tasks?.filter((task) => task.listId === listId)
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
