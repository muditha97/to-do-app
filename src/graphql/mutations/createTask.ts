import { gql } from "@apollo/client";

const CREATE_TASK = gql`
  mutation createTask(
    $title: String!
    $description: String
    $completedDate: String
    $completed: Boolean
  ) {
    createTask(
      title: $title
      description: $description
      completedDate: $completedDate
      completed: $completed
    ) @rest(type: "Task", path: "/tasks", method: "POST") {
      _id
      title
      description
      createdDate
      completedDate
      completed
    }
  }
`;

export { CREATE_TASK };
