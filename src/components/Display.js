import React from 'react';
import './Display.css'

// import { Container } from './styles';


export default props=>{
  return(
    <>
    <div className="display"> {props.value} </div>
    </>
  )
};