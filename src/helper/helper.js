import React from "react";

import { toast } from "react-toastify";

export const errorHandle = (msg) => {
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

export const GiornoShow = ({ anotherDay, datashow, onChangeDate }) => {
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
