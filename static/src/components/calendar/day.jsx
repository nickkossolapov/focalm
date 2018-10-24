import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from "../../store/calendar/drag_types";
import {DayItem} from "./day_item";
import {addDayItem} from "../../store/calendar/actions";

const itemTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    props.addDayItem(item.mealName, props.dateId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Day extends Component {
  render() {
    console.log(this.props.dayItems);
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <li>
        <p>{this.props.day}</p>
        {/*<p>{this.props.dayItems}</p>*/}
      </li>
    );
  }
}

function mapStateToProps({dayItems}, ownProps) {
  return {dayItems: dayItems[ownProps.dateId]};
}

export default connect(mapStateToProps, {addDayItem})(DropTarget(MEAL_TILE, itemTarget, collect)(Day));