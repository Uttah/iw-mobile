import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import { MenuProvider } from 'react-native-popup-menu';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import { Toast } from 'react-native-redux-toast';

// create our store
const store = createStore();

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://icoworld.projects.oktend.com:3000/graphql' }),
  //link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
});

/**
* Provides an entry point into our application.  Both index.ios.js and index.android.js
* call this component first.
*
* We create our Redux store here, put it into a provider and then bring in our
* RootContainer.
*
* We separate like this to play nice with React Native's hot reloading.
*/
class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <StyleProvider style={getTheme(platform)}>
          <Provider store={store}>
            <MenuProvider>
              <RootContainer />
              <Toast messageStyle={{ color: 'white' }} containerStyle={{backgroundColor: 'green'}} />
            </MenuProvider>
          </Provider>
        </StyleProvider>			
      </ApolloProvider>
    )
  }
}

declare global {
  interface Console {
    tron: any
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
? console.tron.overlay(App)
: App
