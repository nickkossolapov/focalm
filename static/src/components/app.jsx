import React from 'react';
import Header from './shared/header';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './app.scss'

library.add(faPlusCircle, faTimesCircle);

export default ({children}) => {
  return (
    <div id='wrapper'>
      <Header/>
      {children}
    </div>
  );
};
