import { gql } from "@apollo/client";

const UPDATE_TASK = gql`
  mutation updateTask(
    $id: string
    $title: String
    $description: String
    $completedDate: String
    $completed: Boolean
  ) {
    updateTask(completed: $completed)
      @rest(type: "Task", path: "/tasks/{args._id}", method: "PUT") {
      _id
      title
      description
      createdDate
      completedDate
      completed
    }
  }
`;

export { UPDATE_TASK };
