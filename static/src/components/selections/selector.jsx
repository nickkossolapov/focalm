import React from 'react';

import './selector.css';
import {connect} from 'react-redux';
import {clearSelection, startSelecting} from '../../store/selections/actions';

function Selector(props){
  return (
    <div className="selector">
      {
        props.isSelecting || props.doneSelecting
        ?  <button onClick={props.clearSelection}>Cancel</button>
        : <button onClick={props.startSelecting}>Start</button>
      }
    </div>
  );
}

function mapStateToProps({selections: {isSelecting, doneSelecting}}) {
  return {isSelecting, doneSelecting};
}

export default connect(mapStateToProps, {startSelecting, clearSelection})(Selector);