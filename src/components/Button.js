import React from 'react';
import './Button.css'
// import { Container } from './styles';

function Button(props) {
  return (
    <button className="button">{props.label}</button>
  )
}

export default Button; 