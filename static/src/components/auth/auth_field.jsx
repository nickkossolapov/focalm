import React from 'react';

import './auth_field.css';

export default function authField({input, label, type, meta: {touched, error}}) {
  return (
    <fieldset className="auth-field">
      <label className="field-label">{label}</label>
      <input
        type={type}
        className={touched && error ? "input-danger" : undefined}
        placeholder={touched && error ? `${error}` : undefined}
        {...input}
      />
    </fieldset>
  );
}