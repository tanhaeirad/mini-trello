import { gql } from '@apollo/client'

export const GET_DATA = gql`
  query GetLists {
    board(id: "1") {
      lists {
        id
        title
        indexOrder
      }
      tasks {
        id
        content
        indexOrder
        listId
      }
    }
  }
`
export const GET_TASKS = ''
export const GET_LISTS = ''
// export const GET_TASKS = gql`
//   query GetTasks {
//     board(id: "1") {
//       tasks {
//         id
//         content
//         indexOrder
//         listId
//       }
//     }
//   }
// `
