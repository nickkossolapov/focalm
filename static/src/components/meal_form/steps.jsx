import {Field} from 'redux-form';
import React from 'react';

import InputField from './input_field';
import PlusButton from '../shared/plus_button';
import CrossButton from '../shared/cross_button';

import './steps.scss';
import TextAreaField from './textarea_field';


export default function Steps(props) {
  const {fields, meta: {error}} = props;

  return (
    <div className='meal-form-steps'>
      <h3>Steps <PlusButton title='Add Step' handleClick={() => fields.push({})}/></h3>
      <ol>
        {fields.map((step, index) => {
          return (
            <li className='meal-form-step' key={index}>
              <Field
                name={`${step}.step`}
                type='text'
                maxLength={256}
                maxRows={4}
                component={TextAreaField}
              />
              <CrossButton title='Remove Step' handleClick={() => fields.remove(index)}/>
            </li>
          )
        })}
      </ol>
    </div>
  )
};
