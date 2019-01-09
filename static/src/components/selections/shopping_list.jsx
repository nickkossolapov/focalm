import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';

import requireAuth from '../require_auth';

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

function ShoppingList(props) {
  //todo: convert to component and load meals on componentWillMount?
  const { meals, calendarItems, selectedStartDateId, selectedEndDateId } = props;

  if (!(props.selectedStartDateId && props.selectedEndDateId)) {
    return <Redirect to="/"></Redirect>
  }

  let selectedMeals = getSelectedMeals(meals, calendarItems, selectedStartDateId, selectedEndDateId);

  return (
    <section className='home-meals'>
      <h3>Shopping List</h3>
      <ul>
        {
          _.map(selectedMeals, meal => {
            return <SelectedMeal {...meal} key={meal.id}/>;
          })
        }
      </ul>
    </section>
  );
}

function SelectedMeal(props){
  return (
    <li>
      {props.name}
    </li>
  )
}

function mapStateToProps(state) {
  const { meals, calendarItems, selections: {selectedStartDateId, selectedEndDateId} } = state;
  return { meals, calendarItems, selectedStartDateId, selectedEndDateId };
}

export default requireAuth(
  connect(mapStateToProps, null)(ShoppingList)
);