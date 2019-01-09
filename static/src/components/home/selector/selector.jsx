import React from 'react';
import {Link} from 'react-router-dom';

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
      {
        props.doneSelecting &&
        <Link to={'/shoppinglist'}>
          <button>
            Get Shopping List
          </button>
        </Link>
      }
    </div>
  );
}

function mapStateToProps(state) {
  const { selections: {isSelecting, doneSelecting} } = state;
  return { isSelecting, doneSelecting };
}

export default connect(mapStateToProps, {startSelecting, clearSelection})(Selector);