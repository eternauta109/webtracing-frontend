import React from "react";

export const ElementFound = ({ found }) => {
 

    if (!found){
        console.log('not found')
        return
    }
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span>
        cod.fisc: {found.codfisc} nome: {found.agregate} phone: {found.phone}{" "}
        screen e showtime: {found.screen}/{found.showtime}{" "}
      </span>
    </li>
  );
};

export default ElementFound;
