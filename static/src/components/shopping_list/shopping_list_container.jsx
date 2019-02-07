import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import requireAuth from '../shared/require_auth';
import ShoppingList from './shopping_list';

function getSelectedMeals(meals, calendarItems, selectedStartDateId, selectedEndDateId) {
  let selectedMeals = [];

  _.map(calendarItems, (calendarMappings, dateId) => {
    if (selectedStartDateId <= dateId && dateId <= selectedEndDateId) {
      _.map(calendarMappings, calendarMapping => {
        selectedMeals.push(meals[calendarMapping.mealId]);
      })
    }
  });

  return selectedMeals;
}

class ShoppingListContainer extends Component {
  constructor(props) {
    super(props);

    const { meals, calendarItems, selectedStartDateId, selectedEndDateId } = this.props;

    this.state = {
      sortByMeals: false,
      selectedMeals: getSelectedMeals(meals, calendarItems, selectedStartDateId, selectedEndDateId)
    }
  }

  componentWillMount() {
    if (!(this.props.selectedStartDateId && this.props.selectedEndDateId)) {
      this.props.history.push('/');
    }
  }


  render () {
    return <ShoppingList
      sortByMeals={this.state.sortByMeals}
      handleSortToggle={value => this.handleSortToggle(value)}
      itemsSortedByMeals={this.getItemsSortedByMeals()}
      itemsSortedByIngredients={this.getItemsSortedByIngredients()}/>
  }

  getItemsSortedByMeals() {
    if (!this.state.sortByMeals){
      return null;
    }

    let items = {};

    this.state.selectedMeals.map(meal => {
      if (!items[meal.id]) {
        items[meal.id] = {
          meal,
          qty: 1
        }
      } else {
        items[meal.id]['qty']++;
      }
    });

    return Object.values(items);
  }

  getItemsSortedByIngredients() {
    if (this.state.sortByMeals){
      return null;
    }

    let items = {};

    this.state.selectedMeals.map(meal => {
      meal.ingredients.map(ingredient => {
        if (!items[ingredient.id]) {
          items[ingredient.id] = {
            ingredient,
            mealName: meal.name,
            qty: 1
          }
        } else {
          items[ingredient.id]['qty']++;
        }
      });
    });

    let list = Object.values(items);
    let sortedList = list.sort(compareIngredients);

    return sortedList;
  }

  handleSortToggle(value) {
    this.setState({sortByMeals: value})
  }
}

function compareIngredients(a, b) {
  return a.ingredient.ingredient.localeCompare(b.ingredient.ingredient)
}

function mapStateToProps(state) {
  const { meals, calendarItems, selections: {selectedStartDateId, selectedEndDateId} } = state;
  return { meals, calendarItems, selectedStartDateId, selectedEndDateId };
}

export default requireAuth(
  connect(mapStateToProps, null)(ShoppingListContainer)
);