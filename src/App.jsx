import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()-_=+[]{}|;:,.<>?/`~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //copy to clipboard
  const copyPassword = useCallback(() => {
    //select karava
    passwordRef.current?.select();
    //optional che nicheni line jo aopde 2 ke 3 char j select karava hoy to ena mate use thay baki naii lakho to badha j select thay aa to khali batava mate lakhyu che
    passwordRef.current?.setSelectionRange(0, 500);

    //copy karva
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //whenever changes occur useEffect run passwordGenerator changes like change in length or numberallowed or charallowed ..
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg  px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-5">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            className=" bg-gray-100 outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gpa-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="accent-blue-500"
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <label className="flex items-center px-4 gap-1">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <label className="flex items-center  gap-1">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
