import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import ListToFind from "./ListToFind";

export const Show = () => {
  const URL = "https://webtracing.herokuapp.com/find";
  /* const URL2 = "http://localhost:3001/find/"; */
  const insert = useRef();
  const [list, setLsit] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    /* console.log(insert.current.value); */

    try {
      await axios
        .post(URL, {
          toFind: insert.current.value
        })
        .then((res) => {
          if (res === null) {
            /* console.log("nullo"); */
            return;
          } else {
            /* console.log("res", res.data); */

            setLsit([...list, res.data]);
            /* console.log(list); */
          }
          return;
        })
        .catch((e) => {
          /* console.log(e); */
          alert("not found");

          return;
        });
    } catch (error) {
      /* console.log(error); */
    }
    insert.current.value = "";
    insert.current.focus();
  };

  return (
    <div className="container">
      <form className="row g-3 m-auto" onSubmit={onSubmit}>
        <div className="col-8">
          <label htmlFor="insert" className="visually-hidden">
            Codici
          </label>
          <input
            type="text"
            ref={insert}
            className="form-control"
            id="insert"
            placeholder="inserisci codici da rintracciare"
          />
        </div>
        <div className="col-4">
          <button type="submit" className="btn btn-primary mb-3">
            Insert
          </button>
        </div>
      </form>

      <ListToFind list={list} />
    </div>
  );
};

export default Show;
