import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';

import {MEAL_TILE} from "../../store/calendar/drag_types";

const itemTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem());
    console.log(props);
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
      <li>{this.props.day}</li>
    );
  }
}

export default DropTarget(MEAL_TILE, itemTarget, collect)(Day);