import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home/home'
import Meal from './components/meals/meal_container'
import MealFormContainer from './components/meal_form/meal_form_container';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import ShoppingListContainer from './components/shopping_list/shopping_list_container';
import reducers from './store';

const store = createStore(
  reducers,
  {
    auth: {authenticated: localStorage.getItem('token')}
  },
  applyMiddleware(reduxThunk)
);

const NoMatch = () => (<Redirect to='/'/>);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/create' component={MealFormContainer}/>
          <Route path='/edit/:id' component={MealFormContainer}/>
          <Route path='/meal/:id' component={Meal}/>
          <Route path='/shoppinglist' component={ShoppingListContainer}/>
          <Route component={NoMatch} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
);

