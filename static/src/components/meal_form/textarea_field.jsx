import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import TextareaAutosize from 'react-autosize-textarea';

export default function TextAreaField(props) {
  const {input, label, type, className, meta: {touched, error}} = props;

  return (
    <fieldset className={className}>
      <label>{label}</label>
      <TextArea {...props}/>
    </fieldset>
  );
}

class TextArea extends Component {
  resizeArea = () => {
    const element = ReactDOM.findDOMNode(this);
    element.style.height = "24px";
    element.style.height = (element.scrollHeight)+"px";
  };

  render() {
    const {input, meta: {touched, error}} = this.props;

    return (
      <TextareaAutosize
        className={touched && error ? 'input-danger' : undefined}
        placeholder={touched && error ? `${error}` : undefined}
        maxLength="256"
        maxRows={5}
        {...input}
      />
    )
  }
}