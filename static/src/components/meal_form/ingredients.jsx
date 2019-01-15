import {Field} from 'redux-form';
import React from 'react';

import InputField from './input_field';
import {MEAL_UNIT} from '../../store/constants/meals';
import CrossButton from "../shared/cross_button";
import PlusButton from "../shared/plus_button";

export default function Ingredients(props) {
  let {fields, meta: {error}} = props;

  return (
    <ul className='general-list'>
      <div>
        <h3>Ingredients</h3>
        <PlusButton title="Add Ingredient"  handleClick={() => fields.push({unit: 'GRAM'})}/>
      </div>
      {fields.map((ingredient, index) => {
        return (
          <li key={index}>
            <Field
              label='Ingredient'
              name={`${ingredient}.ingredient`}
              type='text'
              component={InputField}
            />
            <div className='meal-form-qty'>
              <Field
                label='Qty'
                name={`${ingredient}.qty`}
                type='text'
                normalize={value => value < 0 ? 0 : value.replace(/[^\d.]/g, '', '')}
                component={InputField}
              />
              <Field
                name={`${ingredient}.unit`}
                type='text'
                component='select'
              >
                {/*TODO: add a default and validation? Maybe try again to creat field element*/}
                {/*<option value='' disabled='disabled'>Select a unit</option>*/}
                <IngredientDropdown/>
              </Field>
            </div>
            <CrossButton title="Remove Ingredient"  handleClick={() => fields.remove(index)}/>
          </li>
        )
      })}
    </ul>
  )
};

function IngredientDropdown() {
  return Object.keys(MEAL_UNIT).map(key => {
    return <option value={key} key={key}>{MEAL_UNIT[key].name}</option>
  });
}
