const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`
        type RootQuery {
            products: [String!]!
        }
        type RootMutation {
            createProduct(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            products: () => {
                return ['Product1', 'Product2', 'Product3'];
            },
            createProduct: (args) => {
                const productName = args.name;
                return productName;
            }
        },
        graphiql: true
    })
);

app.listen(3000);