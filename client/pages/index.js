import { Query } from "react-apollo";
import gql from "graphql-tag";
import { renderUI } from "../components";

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      name
      props {
        name
        value
      }
    }
  }
`;

export default () => (
  <Query query={GET_BOOK} variables={{ id: "1" }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return renderUI(data.book);
    }}
  </Query>
);
