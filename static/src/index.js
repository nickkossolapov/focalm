import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Meal from './components/meals/meal'
import Meals from './components/meals/meals';
import MealForm from './components/meals/meal_form';
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
        <Switch>
          <Route path="/signup" component={SignUp}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signout" component={SignOut}/>
          <Route path="/meals" component={Meals}/>
          <Route path="/meal/create" component={MealForm}/>
          <Route path="/meal/:id" component={Meal}/>
          <Route path="/" component={Welcome}/>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
