import React, { Component } from 'react';

import './dropdown_selector.scss';


export default class DropdownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
  }

  handleHover() {
    this.setState({ showDropdown: true });
  };

  handleLeave() {
    this.setState({ showDropdown: false });
  };

  handleClick(key) {
    this.props.input.onChange(key);
    this.setState( { showDropdown: false });
  }


  render() {
    const { input: { value } } = this.props;

    return (
      <div
        className={this.props.className + " dropdown-container"}
        onMouseLeave={() => this.handleLeave()}
      >
        <div className="dropdown-btn" onMouseEnter={() => this.handleHover()}>{this.props.items[value].name}</div>
        { this.state.showDropdown && <DropdownItems items={this.props.items} handleClick={key => this.handleClick(key)}/> }
      </div>
    )
  }
}

function DropdownItems(props) {
  return (
    <ul className="dropdown-list">
      {
        Object.keys(props.items).map(key => {
          return (
            <li
              className="dropdown-list-item"
              value={key}
              key={key}
              onClick={() => props.handleClick(key)}
            >
              {props.items[key].name}
            </li>
          )
        })
      }
    </ul>
  );
}

