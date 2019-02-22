import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from '../../../store/constants/drag_types';
import DayItem from './day_item';
import {addDayItem} from '../../../store/calendar';
import {selectDate} from '../../../store/selections';

import './day.scss';

const itemTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    props.addDayItem(item.mealId, props.dateId);
  },
  canDrop(props, monitor) {
    let item = monitor.getItem();

    return !(props.dayMealIds && (props.dayMealIds.length > 2 || props.dayMealIds.includes(item.mealId)));
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  }
}

class Day extends Component {
  handleClick() {
    if (this.props.isSelecting) {
      this.props.selectDate(this.props.dateId);
    }
  }

  render() {
    const { connectDropTarget, dateId, initialSelectedDateId, selectedStartDateId, selectedEndDateId } = this.props;
    let className = 'day';

    if (dateId === initialSelectedDateId || (selectedStartDateId <= dateId && dateId <= selectedEndDateId)){
      className += ' selected-day';
    }

    return connectDropTarget(
      <li className={className} onClick={() => this.handleClick()}>
        <h2>{this.props.day}</h2>
        <DayItems {...this.props}/>
      </li>
    );
  }
}

function DayItems(props) {
  if (Object.keys(props.meals).length === 0){
    return <ul className='day-list' />;
  }

  let {isSelecting, doneSelecting} = props;

  return (
    <ul className='day-list'>
      {props.calendarItems && props.calendarItems.map(({calendarItemId, mealId}) => {
        let meal = props.meals[mealId];
        return <DayItem
          name={meal.name}
          key={calendarItemId}
          dateId={props.dateId}
          calendarItemId={calendarItemId}
          {...{isSelecting, doneSelecting}}/>
      })}
    </ul>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    calendarItems,
    meals,
    selections: { isSelecting, doneSelecting,initialSelectedDateId, selectedStartDateId, selectedEndDateId }
  } = state;

  return {
    calendarItems: calendarItems[ownProps.dateId],
    meals,
    isSelecting,
    initialSelectedDateId,
    selectedStartDateId,
    selectedEndDateId,
    doneSelecting
  };
}

export default connect(mapStateToProps, {addDayItem, selectDate})(DropTarget(MEAL_TILE, itemTarget, collect)(Day));