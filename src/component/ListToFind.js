import React from 'react';
import ElementFound from './elementToFind';



export const ListToFind = ({list}) => {


 
  
  /* import { useSelector } from "react-redux"; */
 
  /* console.log(registration) */
  return (
    <ul className="list-group list-group-flush">
      {list.map((found, key) => (
        <ElementFound key={key} found={found}/>
      ))}
    </ul>
  );
};

export default ListToFind;