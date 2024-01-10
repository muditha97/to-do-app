import { gql } from "@apollo/client";

const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(_id: $id)
      @rest(type: "Task", path: "/tasks/{args._id}", method: "DELETE") {
      _id
      title
      description
      createdDate
      completedDate
      completed
    }
  }
`;

export { DELETE_TASK };
