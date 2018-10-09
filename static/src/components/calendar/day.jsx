import React, {Component} from "react";

class Day extends Component {
  render() {
    return <li>{this.props.day + 1}</li>;
  }
}

export default Day;