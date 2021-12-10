import React from "react";
import moment from "moment";

export const Accordion = ({ num, nome, screen }) => {
  const arraySala = Array.from(Array(screen).keys());
  moment.locale("it");

  const setArrayTime = () => {
    var items = [];
    var currentDate = moment().set({ hour: 10, minute: 30 });
    new Array(175).fill().map((acc, index) => {
      items.push(currentDate.format("HH:mm"));
      currentDate = currentDate.add(5, "minutes");
    });

    return items;
  };

  console.log(setArrayTime());

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
            ref={nome}
            name="name"
            className="form-control my-2"
            placeholder="NOME E COGNOME"
          />
          <input
            type="text"
            name="phoneNumber"
            ref={num}
            className="form-control my-2"
            placeholder="NUMERO DI TELEFONO"
          />

          <div className="d-flex flex-row">
            <div className="col-4 m-1">
              <label className="text-muted" htmlFor="form-select">
                SALA
              </label>
              <select
                className="form-select mb-1"
                /* onChange={(e) => setMyValue(e.target.value)} */
                defaultValue="screen"
              >
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
                /* onChange={(e) => setMyValue(e.target.value)} */
                defaultValue="orario"
              >
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
