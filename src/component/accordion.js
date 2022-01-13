import React from "react";
import moment from "moment";

export const Accordion = ({
  getInputValue,
  onChangeInput,
  setInputName,
  setScreen,
  setTime,
  num,
  nome,
  totScreen
}) => {
  /* console.log(totScreen); */
  const arraySala = Array.from(Array(totScreen).keys());
  moment.locale("it");

  const setArrayTime = () => {
    var items = [];
    var currentDate = moment().set({ hour: 10, minute: 30 });
    new Array(175).fill().forEach((_acc) => {
      items.push(currentDate.format("HH:mm"));
      currentDate = currentDate.add(5, "minutes");
    });

    return items;
  };

  /* console.log(setArrayTime()); */

  return (
    <div className="accordion accordion" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            tabIndex="-1"
          >
            <p>in caso di registrazione senza codice fiscale...</p>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse px-2"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <input
            type="text"
            id="name"
            ref={nome}
            name="name"
            autoComplete="off"
            className="form-control my-2"
            placeholder="NOME E COGNOME"
            onChange={onChangeInput}
            onFocus={() => setInputName("name")}
            value={getInputValue("name")}
          />
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            ref={num}
            autoComplete="off"
            className="form-control my-2"
            placeholder="NUMERO DI TELEFONO"
            onChange={onChangeInput}
            onFocus={() => setInputName("phoneNumber")}
            value={getInputValue("phoneNumber")}
          />

          <div className="d-flex flex-row">
            <div className="col-4 m-1">
              <label className="text-muted" htmlFor="form-select">
                SALA
              </label>
              <select
                className="form-select mb-1"
                onChange={(e) => setScreen(e.target.value)}
                defaultValue="screen"
              >
                <option text="muted"></option>
                {arraySala.map((e, key) => {
                  return <option key={key}>{e + 1}</option>;
                })}
              </select>
            </div>
            <div className="col-7 m-1">
              <label className="text-muted" htmlFor="form-select">
                ORARIO
              </label>
              <select
                className="form-select mb-1"
                onChange={(e) => setTime(e.target.value)}
                defaultValue="orario"
              >
                <option text="muted"></option>
                {setArrayTime().map((e, key) => {
                  return <option key={key}>{e}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
