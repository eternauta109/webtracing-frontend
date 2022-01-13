import React, { useRef, useState } from "react";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function KeyApp({ inputName, setInputName }) {
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");
  const myname = useRef();

  const keyboard = useRef();

  const onChangeAll = (inputs) => {
    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     */

    console.log("input", inputs);
    setInputs({ ...inputs });

    console.log("Inputs changed", inputs);
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    console.log("input val", inputVal);
    setInputs({
      ...inputs,
      [inputName]: inputVal
    });

    keyboard.current.setInput(inputVal);
  };

  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };

  const cancel = () => {
    setInputs({
      ...inputs,
      [inputName]: ""
    });

    keyboard.current.setInput("");
  };

  return (
    <div className="App">
      <input
        id="firstName"
        autoComplete="off"
        ref={myname}
        value={getInputValue("firstName")}
        onFocus={() => setInputName("firstName")}
        placeholder={"First Name"}
        onChange={onChangeInput}
      />
      <input
        id="lastName"
        autoComplete="off"
        value={getInputValue("lastName")}
        onFocus={() => setInputName("lastName")}
        placeholder={"Last Name"}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        inputName={inputName}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={onKeyPress}
      />
      <button onClick={cancel}>canc</button>
    </div>
  );
}

export default KeyApp;
