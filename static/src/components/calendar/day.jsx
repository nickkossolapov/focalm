import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from "../../store/calendar/drag_types";
import {DayItem} from "./day_item";
import {addDayItem} from "../../store/calendar/actions";

const itemTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    props.addDayItem(item.mealId, props.dateId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Day extends Component {
  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <li>
        <p>{this.props.day}</p>
        {this.props.dayMealIds && this.props.dayMealIds.map(mealId => {
          let meal = this.props.meals[mealId];
          return <DayItem name={meal.name}/>
        })}
      </li>
    );
  }
}

function mapStateToProps({dayItems, meals}, ownProps) {
  return {dayMealIds: dayItems[ownProps.dateId], meals};
}

export default connect(mapStateToProps, {addDayItem})(DropTarget(MEAL_TILE, itemTarget, collect)(Day));