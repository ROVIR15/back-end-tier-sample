import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';

import './utils/db';
import schema from './schema';
import cors from 'cors'
import { graphqlUploadExpress } from 'graphql-upload'

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.ALLOWED_URI_FRONT,
    credentials: true
}

app.use( cors() );

const server = new ApolloServer({
    context: ({req}) => {
    // get the user token from the headers
        const token = req.headers.authorization || '';
        if(!token) console.log('token not found');
    },
    schema,
    cors: corsOptions,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/'
});

server.applyMiddleware({
    app,
    path: '/',
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
    console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});