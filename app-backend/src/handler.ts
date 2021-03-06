import lambdaPlayground from 'graphql-playground-middleware-lambda';
import {Handler, Context, Callback, APIGatewayEvent} from 'aws-lambda';
import {graphqlLambda, graphiqlLambda, LambdaHandler } from 'apollo-server-lambda';
import { ITypeDefinitions } from 'graphql-tools/dist/Interfaces';
import {makeExecutableSchema } from 'graphql-tools';
import {resolvers} from './resolvers';

const typeDefs: ITypeDefinitions = require('./query.graphql');

const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: console,
});

export const graphqlHandler: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
    const handler: LambdaHandler = graphqlLambda({ schema: myGraphQLSchema, tracing: true });
    return handler(event, context, callback);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
export const playgroundHandler: ((event: APIGatewayEvent, context: Context, callback: Callback) => void)
        = lambdaPlayground({

    endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql',
});

export const graphiqlHandler: ((event: APIGatewayEvent, context: Context, callback: Callback) => void)
        = graphiqlLambda({

    endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT || '/production/graphql',
});
