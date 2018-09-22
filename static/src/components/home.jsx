import React, {Component} from 'react';
import {connect} from 'react-redux';

import Meals from './meals/meals'
import './home.css';

class Home extends Component {
  render() {
    if (this.props.authenticated){
      return (
        <main className="main">
          <Meals className="home-meals"/>
        </main>
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