import './App.css';
import { useState, useCallback } from 'react';

const sumHex = (lValue, sValue) => {
  // lValue: longer input, sValue: shorter input
  const diff = lValue.length - sValue.length;
  let result = '', carry = 0;

  for (let i = lValue.length - 1; i >= 0; i--) {
    const d = parseInt(lValue[i], 16) + parseInt(sValue[i - diff] || '0', 16) + carry;
    carry = d >> 4; // right shift by 4 bit to get carry divided by 16
    result = (d & 15).toString(16) + result; // bitwise And and convert hex string
  }

  if (carry) {
    return `${carry}${result}`;
  }

  return result;
};

function App() {
  const [fInput, setfInput] = useState('');
  const [lInput, setlInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value, type) => {
    if (value.length === 1 && value === '0') {
      return;
    }

    const charCode = value.charCodeAt(value.length - 1);
    if (!value || (charCode > 96 && charCode < 103) || (charCode > 47 && charCode < 58)) {
      if (type === 'fValue') {
        setfInput(value);
      } else {
        setlInput(value);
      }
    }
  };

  const calculate = useCallback(() => {
    if (fInput.length > lInput.length) {
      setResult(sumHex(fInput, lInput));
    } else {
      setResult(sumHex(lInput, fInput));
    }
  }, [fInput, lInput]);

  return (
    <div className="App">
      <br />
      <br />
      <h2>
        Summing up 2 arbitrary-length integers as hex.
      </h2>
      <br />
      <br />
      <div className="c-calculate__wrapper">
        <input 
          value={fInput}
          onChange={e => handleInput(e.currentTarget.value, 'fValue')}
          placeholder='insert hex value'
        /> + 
        <input 
          value={lInput}
          onChange={e => handleInput(e.currentTarget.value, 'lValue')}
          placeholder='insert hex value'
        />
        <button disabled={!fInput || !lInput} onClick={calculate}>=</button>
        <input value={result} disabled />
      </div>
    </div>
  );
};

export default App;
