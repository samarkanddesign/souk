import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express, { ErrorRequestHandler } from 'express';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import cookieParser from 'cookie-parser';
import { HttpLink } from 'apollo-link-http';
import { Provider as ReduxProvider } from 'react-redux';
import reducer, { State, Action } from './store/reducers';
import { createStore } from '../node_modules/redux';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql', fetch });

export const serverClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST as string);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).send(`Failure! ${JSON.stringify(err, null, ' ')}`);
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
  .use(cookieParser())
  .use(errorHandler)
  .get('/*', async (req, res) => {
    const context: any = {};
    const basketId: string | undefined = req.cookies.basketId;
    const initialState = basketId ? { basket: { basketId } } : {};
    const store = createStore<State, Action, {}, {}>(reducer);

    const WrappedApp = (
      <ApolloProvider client={serverClient}>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      </ApolloProvider>
    );

    await getDataFromTree(WrappedApp).catch(console.log);

    const markup = renderStylesToString(renderToString(WrappedApp));

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Samarkand Souk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        <script>
        window.__APOLLO_STATE__=${JSON.stringify(
          serverClient.extract(),
        ).replace(/</g, '\\u003c')};

        window.__SAVED_STATE__ = ${JSON.stringify(initialState)};
        </script>

        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`);
    }
  });

export default server;
