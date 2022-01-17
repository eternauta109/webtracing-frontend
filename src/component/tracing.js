import React, { useState, useEffect, useRef } from "react";
import Accordion from "./accordion";
import Table from "./table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ModalPhoto from "./modalPhoto";
import moment from "moment";
import path from "../config/url";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { errorHandle, GiornoShow } from "../helper/helper";
import "./key.css";

/* import KeyApp from "./Keyboard"; */

const layout = {
  default: [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "{shift} z x c v b n m {backspace}",
    "{numbers} {space} {ent}"
  ],
  shift: [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "{shift} Z X C V B N M {backspace}",
    "{numbers} {space} {ent}"
  ],
  numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {backspace}"]
};

const display = {
  "{numbers}": "123",
  "{ent}": "return",
  "{escape}": "esc ⎋",
  "{tab}": "tab ⇥",
  "{backspace}": "⌫",
  "{capslock}": "caps lock ⇪",
  "{shift}": "⇧",
  "{controlleft}": "ctrl ⌃",
  "{controlright}": "ctrl ⌃",
  "{altleft}": "alt ⌥",
  "{altright}": "alt ⌥",
  "{metaleft}": "cmd ⌘",
  "{metaright}": "cmd ⌘",
  "{abc}": "ABC",
  "{space}": " "
};

const style = {
  color: "black",
  fontSize: 200
};

export const Tracing = ({ cinema, totScreen }) => {
  /* console.log(path); */
  const URL = path + "/tracing";
  /* const [codFisc, setCodFisc] = useState(''); */
  const codFisc = useRef();
  const ticket = useRef();
  const buttonSubmit = useRef("");
  const [screen, setScreen] = useState();
  const [time, setTime] = useState();
  const [anotherDay, SetAnotherDay] = useState(false);
  const [datashow, setDataShow] = useState(moment().format("YYYY-MM-DD"));
  /* const date = new Date().toLocaleString() + ''; */
  const agregato = useRef();
  const number = useRef();
  const [counter, setCounter] = useState(0);
  const [registrer, setRegistrer] = useState([]);
  const [inputName, setInputName] = useState("default");
  const [inputs, setInputs] = useState({});
  const [layoutName, setLayoutName] = useState("default");

  const keyboard = useRef();

  function azzeraTutto() {
    codFisc.current.value = null;
    agregato.current.value = null;
    number.current.value = null;
    ticket.current.value = null;
    setInputs({ default: "" });
    keyboard.current.replaceInput({ default: "" });

    setInputName("default");
    keyboard.current.value = "";
    SetAnotherDay(false);
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    /* console.log(datashow); */
    if (!cinema) {
      alert("fai prima il login grazie");
      return;
    }

    //form di registrazione

    let regForm = {
      fiscale: codFisc.current.value.toUpperCase(),
      ticket: ticket.current.value.toUpperCase(),
      nome: agregato.current.value.toUpperCase(),
      phone: number.current.value,
      screen,
      time,
      onDb: false,
      date: anotherDay ? datashow : moment().format("YYYY-MM-DD")
    };
    /* console.log(regForm); */

    //controlli
    if (!regForm.fiscale) {
      if (!regForm.phone || !regForm.nome) {
        errorHandle("inserisci cod. fiscale, o il nome cognome e num di tel");
        return;
      } else {
        regForm.fiscale = regForm.nome + " " + regForm.phone;
      }
    }

    if (!regForm.ticket) {
      if (!regForm.screen || !regForm.time) {
        errorHandle("inserisci codice biglietto o sala e ora");
        return;
      }
    } else {
      regForm.screen = "";
      regForm.time = "";
    }

    //chiamata all'api

    await axios
      .post(URL, {
        registration: {
          cinema: cinema,
          fiscale: regForm.fiscale,
          nameClient: regForm.nome,
          numberPhone: regForm.phone,
          screen: regForm.screen,
          time: regForm.time,
          ticket: regForm.ticket,
          date: regForm.date
        }
      })
      .then((res) => {
        if (res.data) {
          toast.success("registrazione avvenuta", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        } else {
          alert("qualcosa è andato storto. Riprova");
          return;
        }
      })
      .catch((e) => {
        alert("qualcosa è andato storto. Riprova");
        return;
      });

    setCounter(counter + 1);
    /* console.log(counter) */
    let newArrya = [...registrer];
    regForm = { ...regForm, onDb: true, count: counter };
    /* console.log("final regform", regForm); */
    newArrya[counter] = regForm;
    setRegistrer(newArrya);
    /* console.log(newArrya); */
    if (counter === 2) {
      setCounter(0);
    }
    azzeraTutto();
    console.log(regForm);
    /* codFisc.current.focus(); */
  };

  const handleKeyPressed = (e) => {
    /* console.log(e.target.name) */
    if (e.key === "Enter" && e.target.name === "codFisc") {
      /* console.log(e.key) */
      ticket.current.focus();
    }
    if (e.key === "Enter" && e.target.name === "ticket") {
      /* console.log(e.key) */
      buttonSubmit.current.focus();
    }
  };

  const onChangeDate = (e) => {
    setDataShow(e.target.value);
  };

  useEffect(() => {});

  //Funzioni per gestione tastiera virtuale
  const onChangeAll = (inputs) => {
    /**
     * Here we spread the inputs into a new object
     * If we modify the same object, react will not trigger a re-render
     */
    /* console.log("Inputs changed", inputs[inputName]); */
    setInputs({ ...inputs });
    /*  console.log("Inputs changed", inputs[inputName]);
    console.log("input val", keyboard.current); */
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
    /* console.log(layoutName); */
  };

  const handleNumbers = () => {
    const newLayoutName = layoutName === "default" ? "numbers" : "default";
    setLayoutName(newLayoutName);
    /* console.log(layoutName); */
  };

  const onKeyPress = (button) => {
    /* console.log("Button pressed", button); */
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}") handleShift();
    if (button === "{numbers}" || button === "{abc}") handleNumbers();
  };

  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    /* console.log("input val", inputVal);
      console.log("input name", inputName); */
    setInputs({
      ...inputs,
      [inputName]: inputVal
    });
    keyboard.current.setInput(inputVal);
  };

  const getInputValue = (inputName) => {
    return inputs[inputName] || "";
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="login-form bg-light mt-4 p-4">
            <form className="row g-3">
              <h4>Tracing</h4>
              <div className="d-flex justify-content-between">
                <input
                  className="form-control"
                  type="text"
                  value={cinema}
                  aria-label="Disabled input example"
                  disabled
                />
              </div>

              <div className="d-flex justify-content-between">
                <div className="col-9">
                  <input
                    type="text"
                    ref={codFisc}
                    value={getInputValue("codFisc")}
                    id="codFisc"
                    tabIndex="0"
                    onFocus={() => setInputName("codFisc")}
                    name="codFisc"
                    autoComplete="off"
                    onKeyPress={handleKeyPressed}
                    className="form-control"
                    placeholder="CODICE FISCALE"
                    onChange={onChangeInput}
                  />
                </div>

                <div>
                  <ModalPhoto origin={"codfiscale"} setInput={codFisc} />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-9">
                  <input
                    type="text"
                    name="ticket"
                    id="ticket"
                    onFocus={() => setInputName("ticket")}
                    onKeyPress={handleKeyPressed}
                    tabIndex="0"
                    ref={ticket}
                    value={getInputValue("ticket")}
                    autoComplete="off"
                    className="form-control"
                    placeholder="TICKET"
                    onChange={onChangeInput}
                  />
                </div>
                <div>
                  <ModalPhoto origin={"ticket"} setInput={ticket} />
                </div>
              </div>

              <div className="col-12">
                <Accordion
                  setLayoutName={setLayoutName}
                  setScreen={setScreen}
                  setInputName={setInputName}
                  getInputValue={getInputValue}
                  setTime={setTime}
                  num={number}
                  nome={agregato}
                  onChangeInput={onChangeInput}
                  totScreen={totScreen}
                />
              </div>

              <div className="col12">
                <label htmlFor="input-group">
                  seleziona la data dello spettacolo nel caso non sia oggi
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-text">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      checked={anotherDay}
                      onChange={() => SetAnotherDay(!anotherDay)}
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <GiornoShow
                    anotherDay={anotherDay}
                    datashow={datashow}
                    onChangeDate={onChangeDate}
                  />
                </div>
              </div>

              <div className="col-12 d-flex justify-content-center">
                <button
                  ref={buttonSubmit}
                  type="button"
                  onClick={onSubmit}
                  className="btn btn-dark"
                >
                  Register
                </button>
              </div>
            </form>

            <hr />
            <Keyboard
              style={style}
              keyboardRef={(r) => (keyboard.current = r)}
              inputName={inputName}
              layoutName={layoutName}
              onChangeAll={onChangeAll}
              onKeyPress={onKeyPress}
              layout={layout}
              display={display}
            />
            <Table registration={registrer} setRegistrer={setRegistrer} />
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">dev by Fabio Conti</p>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracing;
