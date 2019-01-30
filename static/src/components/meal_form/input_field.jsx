import React from 'react';

import '../shared/globals.scss';

export default function InputField(props) {
  const {input, label, type, className, meta: {touched, error}} = props;

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