import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync, writeFileSync } from "fs";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

let contactsData;
let jsonData;
const file = "./DB.json";

const typeDefs = `
type Contact {
  name: String!
  phone: String!
  id: String!
}

type Query {
  contacts: [Contact]
	contact(id: String!): Contact!
}

type Mutation {
  addContact(name: String!, phone: String!): Contact
  updateContact(id: String!, name: String, phone: String): Contact
  deleteContact(id: String!): Contact
}
`;

const resolvers = {
  Query: {
    // return all books
    contacts: async () => {
      const data = await readFileSync(file);

      console.log("data > ", JSON.parse(data));

      jsonData = JSON.parse(data);
      contactsData = jsonData.contacts;

      return contactsData;
    },
    // return a contact by id
    contact: (_, args) =>
      contactsData.find((contact) => contact.id === args.id),
  },
  Mutation: {
    addContact: (_, { name, phone }) => {
      const newContact = {
        name,
        phone,
        id: Math.random().toString(36).substr(2, 4),
      };

      jsonData.contacts.push(newContact);
      writeFileSync(file, JSON.stringify(jsonData));

      return newContact;
    },
    updateContact: (_, { id, name, phone }) => {
      const existingContact = contactsData.find((contact) => contact.id === id);

      if (existingContact) {
        existingContact.name = name;
        existingContact.phone = phone;

        writeFileSync(file, JSON.stringify(jsonData));
        return existingContact;
      }

      return null;
    },
    deleteContact: (_, { id }) => {
      const existingContact = contactsData.find((contact) => contact.id === id);

      if (existingContact) {
        const updatedTodos = contactsData.filter(
          (contact) => contact.id !== id
        );

        jsonData.contacts = updatedTodos;

        writeFileSync(file, JSON.stringify(jsonData));
        console.log(updatedTodos);

        return existingContact;
      }

      return null;
    },
  },
};

// The ApolloServer constructor takes two parameters: the schema and the resolvers you created
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function.
const { url } = await startStandaloneServer(server, {
  listen: { port: 5001 },
});

console.log(`Server starts at: ${url}`);
