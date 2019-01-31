import React from 'react';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

import Calendar from './calendar/calendar';
import Selector from './selector/selector';
import Sidebar from './sidebar/sidebar';

import './home.scss';

function Home (props) {
  if (props.authenticated){
    return (
      <main className='home'>
        <Calendar />
        <Selector />
        <Sidebar />
      </main>
    );
  } else {
    return <h3 className='main-welcome'>Welcome!</h3>
  }
}

function mapStateToProps(state){
  return {authenticated: state.auth.authenticated};
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Home));