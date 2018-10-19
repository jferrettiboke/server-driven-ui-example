import { Query } from "react-apollo";
import gql from "graphql-tag";
import { renderUI } from "../components";

const BOOK_BY_ID = gql`
  query BookById($id: ID!) {
    bookById(id: $id) {
      name
      props {
        name
        value
      }
    }
  }
`;

export default () => (
  <Query query={BOOK_BY_ID} variables={{ id: "1" }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return renderUI(data.bookById);
    }}
  </Query>
);
