import styled from 'styled-components';
import { useState } from 'react';

const AppWrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
height: 100vh;
background-color: #3a4764;
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
background-color: #182034;
color: #fff;
font-weight: bolder;
font-size: 15px;
text-align: right;
`

const ButtonsWrapper = styled.div`
width: 93.5%;
background-color: #182034;
border-radius: 5px;
padding: 10px;
`

const ButtonsElementWrapper = styled.div`
`

const Button = styled.button`
padding: 20px;
margin: 5px;
width: ${(props) => props.display ? 'calc(285px/2)' : 'calc(265px/4)'};
background-color: #eae3dc;
border: 0px;
border-radius: 5px;
font-size: 15px;
font-weight: bolder;

${(props) => props.color === "blue" &&
    `background-color: #637097;  
    color: #fff;  `
  }

  
${(props) => props.color === "red" &&
    `background-color: #d03f2f;   
color: #fff; `
  }



  
`

function App() {

  const [value, setValue] = useState("")
  const [result, setResult] = useState("")

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

  return (
    <AppWrapper>
      <CalculatorWrapper>
        <InputWrapper>
          <InputElement>
            ({result || "0"}) &nbsp;
            {value || "0"}</InputElement>
        </InputWrapper>
        <ButtonsWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput("7")}>7</Button>
            <Button onClick={() => handleInput("8")}>8</Button>
            <Button onClick={() => handleInput("9")}>9</Button>
            <Button color="blue" onClick={() => deleteLast()}>DEL</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput("4")}>4</Button>
            <Button onClick={() => handleInput("5")}>5</Button>
            <Button onClick={() => handleInput("6")}>6</Button>
            <Button onClick={() => handleInput("+")}>+</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput("1")}>1</Button>
            <Button onClick={() => handleInput("2")}>2</Button>
            <Button onClick={() => handleInput("3")}>3</Button>
            <Button onClick={() => handleInput("-")}>-</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button onClick={() => handleInput(".")}>.</Button>
            <Button onClick={() => handleInput("0")}>0</Button>
            <Button onClick={() => handleInput("/")}>/</Button>
            <Button onClick={() => handleInput("*")}>x</Button>
          </ButtonsElementWrapper>
          <ButtonsElementWrapper>
            <Button display="2" color="blue" onClick={() => reset()}>RESET</Button>
            <Button display="2" color="red" onClick={() => handleCalculate()}>=</Button>
          </ButtonsElementWrapper>
        </ButtonsWrapper>
      </CalculatorWrapper>
    </AppWrapper>
  );
}

export default App;
