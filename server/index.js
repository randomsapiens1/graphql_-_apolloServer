import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';


async function startServer() {
    const app = express();
    const server = new ApolloServer({});
    

}



