import { gql } from "@apollo/client";

const GET_TASKS = gql`
  query {
    tasks @rest(type: "[Task]", path: "/tasks") {
      _id
      title
      description
      createdDate
      completedDate
      completed
    }
  }
`;

export { GET_TASKS };
