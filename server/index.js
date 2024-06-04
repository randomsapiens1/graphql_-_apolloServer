import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';


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
                getTodos: () => [
                    { id: '1', title: 'something something', completed: false },
                ],
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



