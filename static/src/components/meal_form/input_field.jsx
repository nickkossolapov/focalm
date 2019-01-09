import React from 'react';

export function InputField({input, label, type, className, meta: {touched, error}}) {
  return (
    <fieldset className={className}>
      <label>{label}</label>
      <input
        type={type}
        className={touched && error ? 'input-danger' : undefined}
        placeholder={touched && error ? `${error}` : undefined}
        {...input}
      />
    </fieldset>
  );
}