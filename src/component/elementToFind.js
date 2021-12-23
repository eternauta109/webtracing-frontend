import React from "react";

export const ElementFound = ({ found, insert }) => {
  if (!found) {
    console.log("not found");
    return;
  }

  return (
    <tr>
      <th scope="row">{found.codfisc.toUpperCase()}</th>
      <td>{found.ticket ? found.ticket.toUpperCase() : "null"}</td>
      <td>{found.name ? found.name.toUpperCase() : "null"}</td>
      <td>{found.phone ? found.phone : "null"}</td>
      <td>{found.screen ? found.screen : "null"}</td>
      <td>{found.showtime ? found.showtime : "null"}</td>
    </tr>
  );
};

export default ElementFound;
