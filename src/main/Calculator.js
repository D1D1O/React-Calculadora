import React, {Component} from "react";
import './Calculator.css'
import Button from "../components/Button";
import Display from "../components/Display";

const initialState ={
  displayValues: '0',
  clearDisplay:  false,
  operation:     null,
  values: [0, 0],
  curreent: 0
}

export default class Calculator extends Component{

  state = {...initialState}

  constructor(props){
    super(props)
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  clearMemory(){
    this.setState({...initialState})
  }
  operacao(n1,n2,op){

    let valor;

    switch(op){
          case '+':
            valor = n1 + n2;
            break;
          case '-':
            valor = n1 - n2;
            break;
          case '*':
            valor = n1 * n2;
            break;
          case '/':
            n2 = n2 == 0 ? 1 : n2;
            valor = n1 / n2;
            break;
    }
    return valor;
  }

  setOperation(operation) {
    //console.log(operation)
    if(this.state.curreent === 0 ){
      this.setState({operation, curreent:1, clearDisplay: true});
    }else{
      const equals = operation === '='
      const currentOperation = this.state.operation;
      
      const values = [...this.state.values]
      try{
        values[0] = this.operacao(values[0],values[1],currentOperation) //eval(`${values[0]} ${currentOperation} ${values[1]} } `)
      }catch(e){
        values[0] = this.state.values
      }
      values[1] = 0

      this.setState({
        displayValues: values[0],
        operation: equals ? null : operation,
        curreent: equals ? 0:1,
        clearDisplay: !equals,
        values

      })

    }
  }



  addDigit(n){
    if (n === '.' && this.state.displayValues.includes('.')){
      return
    } 
    const clearDisplay = this.state.displayValues ==='0'
          || this.state.clearDisplay;
    
    const curreentValue  = clearDisplay ? '' : this.state.displayValues;
    const displayValues = curreentValue + n;
    this.setState({displayValues, clearDisplay: false});

    if(n !== '.'){
      const i = this.state.curreent;
      const newValue = parseFloat(displayValues);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values })
      /* console.log(values)
      console.log(this.state)*/
    }

  }



  render(){

    return(
      <>  
      <div className="calculator">


        <Display value={this.state.displayValues} />
        <Button label='AC' click={this.clearMemory} triple/>
        <Button label='/' click={this.setOperation} operation/>       
        <Button label='7' click={this.addDigit}/>       
        <Button label='8' click={this.addDigit} />       
        <Button label='9' click={this.addDigit} />       
        <Button label='*' click={this.setOperation} operation/>       
        <Button label='4' click={this.addDigit} />       
        <Button label='5' click={this.addDigit} />       
        <Button label='6' click={this.addDigit} />       
        <Button label='-' click={this.setOperation} operation/>       
        <Button label='1' click={this.addDigit} />       
        <Button label='2' click={this.addDigit} />       
        <Button label='3' click={this.addDigit} />       
        <Button label='+' click={this.setOperation} operation/>       
        <Button label='0' click={this.addDigit} double />       
        <Button label='.' click={this.addDigit} />       
        <Button label='=' click={this.setOperation} operation/>       
      </div>
      </>
    )
  }
}

