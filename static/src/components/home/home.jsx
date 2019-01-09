import React, {Component} from 'react';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

import Meals from './sidebar/meals';
import Calendar from './calendar/calendar';
import Selector from './selector/selector';
import './home.css';



class Home extends Component {
  render() {
    if (this.props.authenticated){
      return (
        <main className='main'>
          <Selector/>
          <Calendar/>
          <Meals className='home-meals'/>
        </main>
      );
    } else {
      return <h3 className='main-welcome'>Welcome!</h3>
    }
  }
}

function mapStateToProps(state){
  return {authenticated: state.auth.authenticated};
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Home));