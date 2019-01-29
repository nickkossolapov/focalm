import {Field} from 'redux-form';
import React from 'react';

import InputField from './input_field';
import {MEAL_UNIT} from '../../store/constants/meals';
import CrossButton from '../shared/cross_button';
import PlusButton from '../shared/plus_button';
import DropdownSelector from './dropdown_selector';

import './ingredients.scss';

export default function Ingredients(props) {
  const {fields, meta: {error}} = props;

  return (
    <div className='meal-form-ingredients'>
      <h3>Ingredients <PlusButton title='Add Ingredient'  handleClick={() => fields.push({unit: 'GRAM'})}/></h3>
      <ul>
        {fields.map((ingredient, index) => {
          return (
            <li className='meal-form-ingredient' key={index}>
              <div className='ingredient-name'>
                <Field
                  name={`${ingredient}.ingredient`}
                  type='text'
                  component={InputField}
                />
                <CrossButton title="Remove Ingredient"  handleClick={() => fields.remove(index)}/>
              </div>
              <div className='ingredient-qty'>
                <Field
                  name={`${ingredient}.qty`}
                  type='text'
                  normalize={value => value < 0 ? 0 : value.replace(/[^\d.]/g, '', '')}
                  component={InputField}
                />
                <Field
                  name={`${ingredient}.unit`}
                  type='text'
                  component={DropdownSelector}
                  className='qty-dropdown'
                  items={MEAL_UNIT}
                >
                </Field>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

