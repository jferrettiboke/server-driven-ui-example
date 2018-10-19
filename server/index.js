const { ApolloServer, gql } = require("apollo-server");

const books = {
  "1": {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    author: "J.K. Rowling"
  },
  "2": {
    id: "2",
    title: "Jurassic Park",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Michael Crichton"
  }
};

const typeDefs = gql`
  type ComponentProp {
    name: String!
    value: String!
  }

  type Component {
    name: String!
    props: [ComponentProp!]!
  }

  type Query {
    bookById(id: ID!): [Component!]!
  }
`;

const resolvers = {
  Query: {
    bookById: (root, { id }) => {
      const book = books[id];

      const Book = {
        name: "Book",
        props: [
          {
            name: "title",
            value: book.title
          },
          {
            name: "description",
            value: book.description
          }
        ]
      };

      const Author = {
        name: "Author",
        props: [
          {
            name: "name",
            value: book.author
          }
        ]
      };

      // Invert order to change the UI and refresh the client
      // return [Author, Book];
      return [Book, Author];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
