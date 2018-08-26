import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express, { ErrorRequestHandler } from 'express';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import cookieParser from 'cookie-parser';
import { HttpLink } from 'apollo-link-http';
import { Provider as ReduxProvider } from 'react-redux';
import reducer, { State, Action } from './store/reducers';
import { createStore } from 'redux';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql', fetch });

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
    const serverClient = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      ssrMode: true,
    });

    const context: any = {};
    const basketId: string | undefined = req.cookies.basketId;
    const token: string | undefined = req.cookies.token;

    const initialState: Partial<State> = basketId
      ? { basket: { basketId, showing: false }, auth: { token } }
      : {};
    const store = createStore<State, Action, {}, {}>(reducer, initialState);

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

    const { html, ids, css } = extractCritical(renderToString(WrappedApp));

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
        <style type="text/css">
        ${css}
        </style>
        <script src="https://checkout.stripe.com/checkout.js"></script>
        <script>
        window.__APOLLO_STATE__=${JSON.stringify(
          serverClient.extract(),
        ).replace(/</g, '\\u003c')};

        window.__SAVED_STATE__ = ${JSON.stringify(initialState)};
        window.__EMOTION_IDS__ = ${JSON.stringify(ids)}
        </script>

        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${html}</div>
    </body>
</html>`);
    }
  });

export default server;
