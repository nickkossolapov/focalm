import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './selector.css';
import {connect} from 'react-redux';
import {clearSelection, startSelecting} from '../../../store/selections/actions';


class Selector extends Component{
  componentWillMount() {
    this.props.clearSelection();
  }

  render() {
    const {isSelecting, doneSelecting, clearSelection, startSelecting} = this.props;
    return (
      <div className="selector">
        {
          isSelecting || doneSelecting
            ?  <button onClick={clearSelection}>Cancel</button>
            : <button onClick={startSelecting}>Start</button>
        }
        {
          doneSelecting &&
          <Link to={'/shoppinglist'}>
            <button>
              Get Shopping List
            </button>
          </Link>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selections: {isSelecting, doneSelecting} } = state;
  return { isSelecting, doneSelecting };
}

export default connect(mapStateToProps, {startSelecting, clearSelection})(Selector);