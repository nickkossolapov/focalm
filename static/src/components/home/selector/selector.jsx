import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {startSelecting} from '../../../store/selections';
import {SelectorButtons} from './selector_buttons';

import './selector.scss';
import {cancelSelection, clearSelection} from '../../../store/selections';

class Selector extends Component{
  componentWillMount() {
    this.props.cancelSelection();
  }

  render() {
    const { isSelecting, doneSelecting,  startSelecting } = this.props;

    let buttonDiv;

    if (isSelecting || doneSelecting){
      buttonDiv = <SelectorButtons {...this.props}/>;
    } else {
      buttonDiv = <button className='selector-btn' onClick={startSelecting}>Start</button>;
    }

    return (
      <div className='selector'>
        {buttonDiv}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selections: {isSelecting, doneSelecting} } = state;
  return { isSelecting, doneSelecting };
}

export default connect(mapStateToProps, {startSelecting, clearSelection, cancelSelection})(Selector);
