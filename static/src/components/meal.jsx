import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchMeal, clearMeal} from "../store/meal/actions";

class Meal extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchMeal(id);
  }

  componentWillUnmount(){
    this.props.clearMeal();
  }

  render() {
    const {meal} = this.props;

    if (!Object.keys(meal).length) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Home</Link>
        <h3>{meal.name}</h3>
        <h6>{meal.description}</h6>
        <p>{meal.servings} servings</p>
        <p>Created on {meal.created_at}</p>
      </div>
    );
  }
}

function mapStateToProps({ currentMeal }, ownProps) {
  return {meal: currentMeal};
}

export default connect(mapStateToProps, {fetchMeal, clearMeal})(Meal);