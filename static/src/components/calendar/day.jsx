import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from "../../store/calendar/drag_types";
import {DayItem} from "./day_item";
import {addDayItem} from "../../store/calendar/actions";

const itemTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    // console.log(item);
    console.log(props);

    //TODO: figure out way to access action creator
    // maybe https://github.com/jcolemorrison/react-dnd-redux-example/blob/master/src/Board.js ?
    // props.addDayItem(item.mealName, props.dateId);
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
        <p>{this.props.dayItems}</p>
      </li>
    );
  }
}

function mapStateToProps({dayItems}, ownProps) {
  return {dayItems: dayItems[ownProps.dateId]};
}

export default DropTarget(MEAL_TILE, itemTarget, collect)(connect(mapStateToProps, {addDayItem})(Day));