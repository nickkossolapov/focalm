import React from 'react';
import {Link} from 'react-router-dom';
import {Field, FieldArray} from 'redux-form';

import InputField from './input_field';
import Steps from './steps';
import Ingredients from './ingredients';
import TextAreaField from './textarea_field';
import Servings from "./servings";
import './meal_form.scss'
import MealFormButtons from './meal_form_buttons';



export default function MealForm(props) {
  const {handleSubmit, pristine, reset, submitting, promiseFailed, submitForm} = props;

  return (
    <form className='meal-form' onSubmit={handleSubmit(submitForm)}>
      <div className='meal-form-info'>
        <Field
          label='Name'
          name='name'
          type='text'
          className='meal-form-name'
          component={InputField}
        />
        <Field
          label='Servings'
          name='servings'
          defaultValue='1'
          normalize={value => value < 1 ? 1 : Number.parseInt(value)}
          component={Servings}
        />
        <Field
          label='Description'
          name='description'
          className='meal-form-description'
          maxLength={256}
          maxRows={5}
          component={TextAreaField}
        />
      </div>
      <div className='meal-form-lists'>
        <FieldArray name='steps' component={Steps} />
        <FieldArray name='ingredients' component={Ingredients} />
      </div>
      <MealFormButtons
        submitting={submitting}
        reset={reset}
        promiseFailed={promiseFailed}
      />
    </form>
  );
};
