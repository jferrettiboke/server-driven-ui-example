const { ApolloServer, gql } = require("apollo-server");
const book = require("./generated/book");
const author = require("./generated/author");
const review = require("./generated/review");
const heading = require("./generated/heading");

const books = {
  "1": {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    author: "J.K. Rowling",
    reviews: [
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere itaque saepe ab esse, sunt quisquam accusantium similique tenetur possimus, excepturi magni quis quaerat voluptatum temporibus ea, eaque earum incidunt vel.",
        author: "Alice"
      },
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam officia voluptates maiores ipsum rerum culpa repellat magni dolore adipisci nihil eum ea sunt possimus veritatis debitis, beatae, repellendus consectetur aliquid!",
        author: "John"
      },
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dicta ea illum consequatur reiciendis ullam itaque enim, facere possimus nulla nostrum cupiditate dolore amet necessitatibus officiis nihil ipsum sunt quod.",
        author: "Peter"
      }
    ]
  },
  "2": {
    id: "2",
    title: "Jurassic Park",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Michael Crichton",
    reviews: [
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere itaque saepe ab esse, sunt quisquam accusantium similique tenetur possimus, excepturi magni quis quaerat voluptatum temporibus ea, eaque earum incidunt vel.",
        author: "Emily"
      },
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam officia voluptates maiores ipsum rerum culpa repellat magni dolore adipisci nihil eum ea sunt possimus veritatis debitis, beatae, repellendus consectetur aliquid!",
        author: "George"
      },
      {
        text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dicta ea illum consequatur reiciendis ullam itaque enim, facere possimus nulla nostrum cupiditate dolore amet necessitatibus officiis nihil ipsum sunt quod.",
        author: "Amelia"
      }
    ]
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
      const Book = book({
        title: _book.title,
        description: _book.description
      });
      const Author = author({ name: _book.author });
      const Reviews = [
        heading({ text: "Reviews" }),
        ..._book.reviews.map(({ author, text }) => review({ author, text }))
      ];

      // Invert order to change the UI and refresh the client
      // return [Author, Book];
      return [Book, Author, ...Reviews];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
