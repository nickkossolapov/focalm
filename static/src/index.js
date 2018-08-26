import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './components/app';
import Welcome from './components/welcome';
import SignUp from './components/auth/signup'
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome}/>
        <Route path="/signup" component={SignUp}/>
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
