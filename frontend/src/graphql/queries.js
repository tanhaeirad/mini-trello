import { gql } from '@apollo/client'

export const GET_LISTS = gql`
  query GetLists {
    lists {
      id
      title
      indexOrder
    }
  }
`

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      content
      indexOrder
      listId
    }
  }
`
