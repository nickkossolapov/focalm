import React, {Component} from 'react';
import {connect} from 'react-redux';

import Meals from './meals/meals'

class Home extends Component {
  render() {
    if (this.props.authenticated){
      return (
        <div>
          <Meals />
        </div>
      );
    } else {
      return <h3>Welcome!</h3>
    }
  }
}

function mapStateToProps(state){
  return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps)(Home);