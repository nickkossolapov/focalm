import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {signout} from '../../store/auth/actions';
import './header.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className='login-links'>
          <span onClick={() => this.props.signout()} className='sign-out-link'>Sign out</span>
        </div>
      )
    } else {
      return (
        <div className='login-links'>
          <div>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      )
    }
  };

  render() {
    return (
      <header className='header'>
        <Link className='logo' to='/'>focalm</Link>
        {this.renderLinks()}
      </header>
    );
  }
}

function mapStateToProps(state){
  return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps, {signout})(Header);