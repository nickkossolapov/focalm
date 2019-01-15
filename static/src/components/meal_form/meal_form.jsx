import React from 'react';
import {Link} from 'react-router-dom';
import {Field, FieldArray} from 'redux-form';

import InputField from './input_field';
import Steps from './steps';
import Ingredients from './ingredients';

import './meal_form.css'

export default function MealForm(props) {
  const {handleSubmit, pristine, reset, submitting, promiseFailed, submitForm} = props;

  return (
    <form className='meal-form' onSubmit={handleSubmit(submitForm)}>
      <div className='meal-form-description'>
        <Field
          label='Name'
          name='name'
          type='text'
          component={InputField}
        />
        <Field
          label='Servings'
          name='servings'
          type='number'
          defaultValue='1'
          normalize={value => value < 1 ? 1 : Number.parseInt(value)}
          component={InputField}
        />
        <Field
          label='Description'
          name='description'
          type='text'
          component={InputField}
        />
      </div>
      <div className='meal-form-lists'>
        <FieldArray name='steps' component={Steps} />
        <FieldArray name='ingredients' component={Ingredients} />
      </div>
      <div className='meal-form-buttons'>
        <button type='submit' disabled={submitting}>Submit</button>
        <button type='button' disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <Link to='/'>Cancel</Link>
      </div>
      {submitting && <div>Loading...</div>}
      {promiseFailed && !submitting && <div>Submit failed, please try again</div>}
    </form>
  );
};
