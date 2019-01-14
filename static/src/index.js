import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home/home'
import Meal from './components/meals/meal'
import MealForm from './components/meal_form/meal_form_container';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import ShoppingList from './components/shopping_list/shopping_list';
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
          <Route path='/signup' component={SignUp}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signout' component={SignOut}/>
          <Route path='/meal/create' component={MealForm}/>
          <Route path='/meal/:id' component={Meal}/>
          <Route path='/shoppinglist' component={ShoppingList}/>
          <Route path='/' component={Home}/>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
