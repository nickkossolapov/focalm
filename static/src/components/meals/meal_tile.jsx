import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { DragSource } from 'react-dnd';
import {MEAL_TILE} from "../../store/calendar/drag_types";


const itemSource = {
  beginDrag(props) {
    return {id: props.id}
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class MealTile extends Component {
  render() {
    const { isDragging, connectDragSource, src } = this.props;

    return connectDragSource(
      <li className="meal-list-item">
        <Link to={`/meal/${this.props.id}`}>
          {this.props.name}
        </Link>
      </li>
    );
  }
}

export default DragSource(MEAL_TILE, itemSource, collect)(MealTile);
