import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { AUTH_TOKEN } from './constants'

// import Apollo dependeces required packages
// 1) importons les dépendances requises à partir des packages installés.
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'

//create an Apollo server
// 2) Ici, vous créez le httpLinkqui connectera votre ApolloClientinstance à l'API GraphQL sur laquelle votre serveur GraphQL fonctionnera http://localhost:4000.
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

//
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// 3) Vous instanciez maintenant ApolloClienten transmettant le httpLinket une nouvelle instance d'un InMemoryCache.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})



ReactDOM.render(
  // 4) Enfin, vous effectuez le rendu du composant racine de votre application React. Le Appest enveloppé avec le composant d'ordre supérieur ApolloProviderqui est passé clientcomme accessoire.
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
