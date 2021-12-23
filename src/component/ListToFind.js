import React from "react";
import ElementFound from "./elementToFind";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export const ListToFind = ({ list, insert }) => {
  /* import { useSelector } from "react-redux"; */

  /* console.log(registration) */
  return (
    <>
      <table id="table-to-xls" className="table table-striped">
        <thead>
          <tr>
            <th scope="col">cod. fisc.</th>
            <th scope="col">ticket</th>
            <th scope="col">name</th>
            <th scope="col">phone</th>
            <th scope="col">screen</th>
            <th scope="col">time</th>
          </tr>
        </thead>
        <tbody>
          {list.map((found, key) => (
            <ElementFound key={key} found={found} insert={insert} />
          ))}
        </tbody>
      </table>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-success mb-3"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Export Data to Excel Sheet"
      />
    </>
  );
};

export default ListToFind;
