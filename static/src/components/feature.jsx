import React, {Component} from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
  render() {
    return <div>You are logged in</div>;
  }
}

export default requireAuth(Feature);
