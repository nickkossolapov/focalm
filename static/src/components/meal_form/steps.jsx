import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Field} from 'redux-form';
import React from 'react';

import InputField from './input_field';

const Steps = (props) => {
  const {fields, meta: {error}} = props;
  return (
    <ol className=''>
      <div>
        <h3>Steps</h3>
        <button type='button' className='increment-button' onClick={() => fields.push({})}>
          <FontAwesomeIcon icon='plus-circle'/>
        </button>
      </div>
      {fields.map((step, index) => {
        return (
          <li key={index}>
            <Field
              name={`${step}.step`}
              type='text'
              className='list-field'
              component={InputField}
            />
            <button
              type='button'
              title='Remove Step'
              onClick={() => fields.remove(index)}
              label='Delete'
              className='increment-button'
            >
              <FontAwesomeIcon icon='times-circle'/>
            </button>
          </li>
        )
      })}
    </ol>
  )
};

export default Steps;