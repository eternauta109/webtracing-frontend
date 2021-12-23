import React, { useState, useEffect, useRef } from "react";
import Accordion from "./accordion";
import Table from "./table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ModalPhoto from "./modalPhoto";
import moment from "moment";

export const Tracing = ({ cinema, totScreen }) => {
  const URL = "https://webtracing.herokuapp.com/tracing";
  /* const [codFisc, setCodFisc] = useState(''); */
  const codFisc = useRef();
  const ticket = useRef();
  const buttonSubmit = useRef("");
  const [screen, setScreen] = useState();
  const [time, setTime] = useState();
  const [anotherDay, SetAnotherDay] = useState(false);
  const [datashow, setDataShow] = useState("");
  /* const date = new Date().toLocaleString() + ''; */
  const agregato = useRef();
  const number = useRef();
  const [counter, setCounter] = useState(0);
  const [registrer, setRegistrer] = useState([]);

  function azzeraTutto() {
    codFisc.current.value = null;
    agregato.current.value = null;
    number.current.value = null;
    ticket.current.value = null;

    SetAnotherDay(false);
  }

  const errorHandle = (msg) => {
    return toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

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

  const GiornoShow = () => {
    if (!anotherDay) {
      return (
        <input
          name="date"
          className="form-control text-muted"
          aria-label="Disabled input example"
          placeholder="date"
          value={new Date().toLocaleString() + ""}
          disabled
        />
      );
    } else {
      return (
        <input
          type="date"
          value={datashow}
          onChange={onChangeDate}
          className="form-control "
          aria-label="Text input with checkbox"
        />
      );
    }
  };

  const onChangeDate = (e) => {
    setDataShow(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="login-form bg-light mt-4 p-4">
            <form className="row g-3">
              <h4>Tracing</h4>
              <div className="col-12">
                <input
                  className="form-control"
                  type="text"
                  value={cinema}
                  aria-label="Disabled input example"
                  disabled
                />
              </div>
              <div className="col-10">
                <input
                  type="text"
                  ref={codFisc}
                  tabIndex="0"
                  name="codFisc"
                  onKeyPress={handleKeyPressed}
                  className="form-control"
                  placeholder="CODICE FISCALE"
                />
              </div>
              <div className="col-2">
                <ModalPhoto origin={"codfiscale"} setInput={codFisc} />
              </div>

              <div className="col-10">
                <input
                  type="text"
                  name="ticket"
                  onKeyPress={handleKeyPressed}
                  tabIndex="0"
                  ref={ticket}
                  className="form-control"
                  placeholder="TICKET"
                />
              </div>
              <div className="col-2">
                <ModalPhoto origin={"ticket"} setInput={ticket} />
              </div>

              <div className="col-12">
                <Accordion
                  setScreen={setScreen}
                  setTime={setTime}
                  num={number}
                  nome={agregato}
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
                  <GiornoShow />
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
            <Table registration={registrer} setRegistrer={setRegistrer} />
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">dev by Fabio Conti</p>
            </div>
          </div>
        </div>
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
  );
};

export default Tracing;
