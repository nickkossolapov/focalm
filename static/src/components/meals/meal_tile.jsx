import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MealTile extends Component {
  render() {
    return (
      <li className="meal-list-item">
        <Link to={`/meal/${this.props.id}`}>
          {this.props.name}
        </Link>
      </li>
    );
  }
}

export default MealTile;
