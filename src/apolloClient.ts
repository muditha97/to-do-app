import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://to-do-api-7d91.onrender.com",
});

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://to-do-api-7d91.onrender.com",
});

const client = new ApolloClient({
  link: ApolloLink.from([restLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
