import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
         type Todo {
            id: ID!
            title: String!
            completed: Boolean
         }

         type Query {
            getTodos: [Todo]
         }
        `,
        resolvers: {
            Query: {
                getTodos: async () => {
                    try {
                        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                        console.log('Fetched data:', response.data); // Log the fetched data
                        return response.data.map(todo => ({
                            id: todo.id.toString(), // Ensure ID is a string
                            title: todo.title,
                            completed: todo.completed
                        }));
                    } catch (error) {
                        console.error('Error fetching todos:', error);
                        throw new Error('Unable to fetch todos');
                    }
                },
            },
        }
    });

    // Middleware
    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(3000, () => 
        console.log('Server running on port 3000')
    );
}

startServer();
