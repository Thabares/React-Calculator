import styled from 'styled-components';
import { useState } from 'react';

const AppWrapper = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
${props => props.theme === "dark" && `
  background-color: #3a4764;
`}
${props => props.theme === "light" && `
  background-color: #dedede;
`}
`
const CalculatorWrapper = styled.div`
width: 330px;
height: 440px;
border-radius: 5px;
`;
const InputWrapper = styled.div`
height: 100px;
`
const InputElement = styled.div`
height: 60px;
width: 93%;
border: 0px;
margin: 0px;
padding: 10px;
border-radius: 5px;
font-weight: bolder;
font-size: 15px;
text-align: right;
${props => props.theme === "dark" && `
background-color: #182034;
color: #fff;
`}
${props => props.theme === "light" && `
background-color: #ededed;
color: #000;
`}
`
const ButtonsWrapper = styled.div`
width: 93.5%;
border-radius: 5px;
padding: 10px;
${props => props.theme === "dark" && `
    background-color: #182034;
`}
${props => props.theme === "light" && `
background-color: #d1cccc;
`}
`
const ButtonsElementWrapper = styled.div``
const Button = styled.button`
padding: 20px;
margin: 5px;
cursor: pointer;
border: 0px;
border-radius: 5px;
font-size: 15px;
font-weight: bolder;
width: ${(props) => props.display ? 'calc(285px/2)' : 'calc(265px/4)'};
${props => props.theme === "dark" && `
    background-color: #eae3dc;
`}
${props => props.theme === "light" && `
background-color: #e5e4e1;
`}
${(props) => props.theme === "dark" && props.color === "blue" && `
  background-color: #637097;  
  color: #fff;  
`}
${(props) => props.theme === "light" && props.color === "blue" && `
background-color: #377f86;
color: #fff;  
`}
${(props) => props.color === "red" && `
  background-color: #d03f2f;   
  color: #fff; 
`}  
`
const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #d1cccc;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #182034;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;


function App() {

  const [value, setValue] = useState("")
  const [result, setResult] = useState("")
  const [theme, setTheme] = useState("dark")

  const ops = ['/', '*', '+', '-', '.']

  const handleInput = (input) => {
    if (ops.includes(input) && value === '' ||
      ops.includes(input) && ops.includes(value.slice(-1))) {
      return
    }
    setValue((prev) => prev + input)

    if (!ops.includes(input)) {
      setResult(eval(value + input).toString())
    }
  }

  const handleCalculate = () => {
    setValue(eval(value).toString())
  }

  const deleteLast = () => {
    if (value === '') {
      return
    }
    const updateVal = value.slice(0, -1)
    setValue(updateVal)
  }

  const reset = () => {
    setValue("")
  }

  const handleSwitch = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <AppWrapper theme={theme}>
      <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" onChange={handleSwitch} checked={theme === "dark"} />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      <CalculatorWrapper>
        <InputWrapper>
          <InputElement theme={theme}>
            ({result || "0"}) &nbsp;
            {value || "0"}</InputElement>
        </InputWrapper>
        <ButtonsWrapper theme={theme}>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput("7")} theme={theme}>7</Button>
            <Button onClick={() => handleInput("8")} theme={theme}>8</Button>
            <Button onClick={() => handleInput("9")} theme={theme}>9</Button>
            <Button color="blue" onClick={() => deleteLast()} theme={theme}>DEL</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput("4")} theme={theme}>4</Button>
            <Button onClick={() => handleInput("5")} theme={theme}>5</Button>
            <Button onClick={() => handleInput("6")} theme={theme}>6</Button>
            <Button onClick={() => handleInput("+")} theme={theme}>+</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput("1")} theme={theme}>1</Button>
            <Button onClick={() => handleInput("2")} theme={theme}>2</Button>
            <Button onClick={() => handleInput("3")} theme={theme}>3</Button>
            <Button onClick={() => handleInput("-")} theme={theme}>-</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput(".")} theme={theme}>.</Button>
            <Button onClick={() => handleInput("0")} theme={theme}>0</Button>
            <Button onClick={() => handleInput("/")} theme={theme}>/</Button>
            <Button onClick={() => handleInput("*")} theme={theme}>x</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button display="2" color="blue" onClick={() => reset()} theme={theme}>RESET</Button>
            <Button display="2" color="red" onClick={() => handleCalculate()} theme={theme}>=</Button>
          </ButtonsElementWrapper>
        </ButtonsWrapper>
      </CalculatorWrapper>
    </AppWrapper>
  );
}

export default App;
