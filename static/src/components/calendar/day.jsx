import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from '../../store/calendar/drag_types';
import DayItem from './day_item';
import {addDayItem} from '../../store/calendar/actions';
import {selectDate} from '../../store/selections/actions';

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
    let className;

    if (dateId == initialSelectedDateId || (selectedStartDateId <= dateId && dateId <= selectedEndDateId)){
      className = 'selected-day';
    }

    return connectDropTarget(
      <li className={className} onClick={() => this.handleClick()}>
        <p>{this.props.day}</p>
        <DayItems {...this.props}/>
      </li>
    );
  }
}

function DayItems(props) {
  if (Object.keys(props.meals).length === 0){
    return <p>...</p>
  }
  return (
    <ul>
      {props.calendarItems && props.calendarItems.map(({calendarItemId, mealId}) => {
        let meal = props.meals[mealId];
        return <DayItem
          name={meal.name}
          key={meal.id}
          dateId={props.dateId}
          calendarItemId={calendarItemId}/>
      })}
    </ul>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    calendarItems,
    meals,
    selections: { isSelecting, initialSelectedDateId, selectedStartDateId, selectedEndDateId }
  } = state;

  return {
    calendarItems: calendarItems[ownProps.dateId],
    meals,
    isSelecting,
    initialSelectedDateId,
    selectedStartDateId,
    selectedEndDateId
  };
}

export default connect(mapStateToProps, {addDayItem, selectDate})(DropTarget(MEAL_TILE, itemTarget, collect)(Day));