//https://www.youtube.com/watch?v=WtkKwO1viI8&t=165s

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { default: axios} from 'axios';


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
                getTodos: async ()=> await axios.get('https://jsonplaceholder.typicode.com/todos/')
            },
        },
    });

    //middleware
    app.use(bodyParser.json());
    app.use(cors());

    await server.start()

    app.use("/graphql", expressMiddleware(server));

    app.listen(3000, ()=>
        console.log('Server running on port 3000')
    );

}

startServer();



