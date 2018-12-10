const { ApolloServer, gql } = require("apollo-server");
const book = require("./generated/book");
const author = require("./generated/author");

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
    book(id: ID!): [Component!]!
  }
`;

const resolvers = {
  Query: {
    book(root, { id }) {
      const _book = books[id];

      // We shape each section using the generated functions
      const Author = author({ name: _book.author });
      const Book = book({
        title: _book.title,
        description: _book.description
      });

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
