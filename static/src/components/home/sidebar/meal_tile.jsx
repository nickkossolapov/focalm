import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { DragSource } from 'react-dnd';
import {MEAL_TILE} from '../../../store/calendar/drag_types';


import './meal_tile.scss';

const itemSource = {
  beginDrag(props) {
    return {
      mealId: props.id
    }
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
    const { connectDragSource, name, id } = this.props;

    return connectDragSource(
      <li className='sidebar-meal-list-item' title={name}>
        <Link to={`/meal/${id}`}>
          {name}
        </Link>
      </li>
    );
  }
}

export default DragSource(MEAL_TILE, itemSource, collect)(MealTile);
