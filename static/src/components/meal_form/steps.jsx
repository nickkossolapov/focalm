import {Field} from 'redux-form';
import React from 'react';

import InputField from './input_field';
import PlusButton from "../shared/plus_button";
import CrossButton from '../shared/cross_button';

export default function Steps(props) {
  const {fields, meta: {error}} = props;

  return (
    <div>
      <h3>Steps <PlusButton title="Add Step"  handleClick={() => fields.push({})}/> </h3>
      <ol className=''>
        {fields.map((step, index) => {
          return (
            <li key={index}>
              <Field
                name={`${step}.step`}
                type='text'
                className='list-field'
                component={InputField}
              />
              <CrossButton title="Remove Step"  handleClick={() => fields.remove(index)}/>
            </li>
          )
        })}
      </ol>
    </div>
  )
};
