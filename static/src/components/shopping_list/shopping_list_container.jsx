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

    //todo: convert to component and load meals on componentWillMount?
    const { meals, calendarItems, selectedStartDateId, selectedEndDateId } = this.props;

    this.selectedMeals = getSelectedMeals(meals, calendarItems, selectedStartDateId, selectedEndDateId);

    this.state = {
      sortByMeals: false
    }
  }

  componentDidMount() {
    if (!(this.props.selectedStartDateId && this.props.selectedEndDateId)) {
      return <Redirect to="/"></Redirect>
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
  }

  getItemsSortedByIngredients() {
    if (this.state.sortByMeals){
      return null;
    }
  }

  handleSortToggle(value) {
    this.setState({sortByMeals: value})
  }
}

function mapStateToProps(state) {
  const { meals, calendarItems, selections: {selectedStartDateId, selectedEndDateId} } = state;
  return { meals, calendarItems, selectedStartDateId, selectedEndDateId };
}

export default requireAuth(
  connect(mapStateToProps, null)(ShoppingListContainer)
);