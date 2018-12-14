import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from '../../store/calendar/drag_types';
import DayItem from './day_item';
import {addDayItem} from '../../store/calendar/actions';

const itemTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    console.log(props);
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
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <li>
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

function mapStateToProps({calendarItems, meals}, ownProps) {
  return {calendarItems: calendarItems[ownProps.dateId], meals};
}

export default connect(mapStateToProps, {addDayItem})(DropTarget(MEAL_TILE, itemTarget, collect)(Day));