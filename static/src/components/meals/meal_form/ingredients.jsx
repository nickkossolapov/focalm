import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Field} from 'redux-form';
import {InputField} from './input_field';
import React from 'react';
import {MEAL_UNIT} from '../../../store/constants/meals';

export function Ingredients(props) {
  let {fields, meta: {error}} = props;
  return (
    <ul className='general-list'>
      <div>
        <h3>Ingredients</h3>
        <button type='button' className='increment-button' onClick={() => fields.push({unit: 'GRAM'})}>
          <FontAwesomeIcon icon='plus-circle'/>
        </button>
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
            <button
              type='button'
              title='Remove Ingredient'
              onClick={() => fields.remove(index)}
              label='Delete'
              className='increment-button'
            >
              <FontAwesomeIcon icon='times-circle'/>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function IngredientDropdown() {
  return Object.keys(MEAL_UNIT).map(key => {
    return <option value={key} key={key}>{MEAL_UNIT[key].name}</option>
  });
}