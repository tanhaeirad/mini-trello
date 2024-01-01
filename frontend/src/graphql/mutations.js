import { gql } from '@apollo/client'

export const CREATE_LIST = gql`
  mutation CreateList($id: ID!, $title: String!, $indexOrder: Int!) {
    createList(
      listData: {
        id: $id
        title: $title
        boardId: "1"
        indexOrder: $indexOrder
      }
    ) {
      list {
        id
        title
        indexOrder
      }
    }
  }
`
export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      ok
      id
    }
  }
`

export const UPDATE_LIST_ORDER = gql`
  mutation UpdateList($id: ID!, $indexOrder: Int!) {
    updateList(id: $id, listData: { indexOrder: $indexOrder }) {
      list {
        id
        indexOrder
      }
    }
  }
`
export const UPDATE_LIST_TITLE = gql`
  mutation UpdateList($id: ID!, $title: String!) {
    updateList(id: $id, listData: { title: $title }) {
      list {
        id
        title
      }
    }
  }
`
export const CREATE_TASK = gql`
  mutation createTask(
    $id: ID!
    $content: String!
    $listId: ID!
    $indexOrder: Int!
  ) {
    createTask(
      taskData: {
        id: $id
        content: $content
        listId: $listId
        boardId: "1"
        indexOrder: $indexOrder
      }
    ) {
      task {
        id
        content
        indexOrder
        listId
      }
    }
  }
`
export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      ok
      id
    }
  }
`
export const UPDATE_TASK_ORDER = gql`
  mutation UpdateTask($id: ID!, $listId: ID!, $indexOrder: Int!) {
    updateTask(
      id: $id
      taskData: { indexOrder: $indexOrder, listId: $listId }
    ) {
      task {
        id
        listId
        indexOrder
      }
    }
  }
`
export const UPDATE_TASK_CONTENT = gql`
  mutation UpdateTask($id: ID!, $content: String!) {
    updateTask(id: $id, taskData: { content: $content }) {
      task {
        id
        content
      }
    }
  }
`
