import React from 'react';
import Header from "./header";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './app.css'

library.add(faPlusCircle, faTimesCircle);

export default ({children}) => {
  return (
    <div className="wrapper">
      <Header/>
      {children}
    </div>
  );
};
