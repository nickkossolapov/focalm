import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Meals from './components/meals';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import Welcome from './components/welcome';
import reducers from './store';


const store = createStore(
  reducers,
  {
    auth: {authenticated: localStorage.getItem('token')}
  },
  applyMiddleware(reduxThunk)
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signout" component={SignOut}/>
        <Route path="/meals" component={Meals}/>
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
