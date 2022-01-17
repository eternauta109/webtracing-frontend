import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function KeyApp({ keyboard, inputName, layoutName, onChangeAll, onKeyPress }) {
  return (
    <Keyboard
      keyboardRef={(r) => (keyboard.current = r)}
      inputName={inputName}
      layoutName={layoutName}
      onChangeAll={onChangeAll}
      onKeyPress={onKeyPress}
    />
  );
}

export default KeyApp;
