import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
  buildSchema,
} from 'graphql-tools';

const typeDefs = `
type Query {
    tasks: [Task!]!
    task(id: ID!): Task
    me: User
  }
  
  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTask(description: String!, completionDate: String! state: String!): Task!
    updateTaskState(id: ID!, state: String!): Task!
    deleteTask(id: ID!): Task!
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }
  
  type User {
    id: ID!
    email: String!
    name: String!
    tasks: [Task!]!
  }
  
  type Task {
    id: ID!
    completionDate: String!
    isDeleted: Boolean!
    description: String!
    state: String!
    author: User!
  }  
`;

const schema = buildSchema(typeDefs, {});

describe('Schema', () => {  

  const mockSchema = makeExecutableSchema({
    typeDefs,
  });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 12.34,
      String: () => 'Dog',
    },
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(schema, {});

      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });
});
