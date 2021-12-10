import React  from 'react';
import { useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

const ModalPhoto = ({ origin, setInput }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(false);

  /* console.log("show", show); */

  
  const onUpdateScreen = (err, result) => {
    if (result) {
      setInput.current.value = result;
      setData(result.text);
      setShow(false);
    } else {
      setData("not found");
    }
  };

  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-secondary "
        data-bs-toggle="modal"
        tabIndex={-1}
        onClick={() => setShow(true)}
        data-bs-target={"#modalPhoto" + origin}
      >
        <i className="bi bi-camera-fill"></i>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={"modalPhoto" + origin}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Scann {origin}
              </h5>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="shadow p-3 mb-5 bg-body rounded">
                <>
                  {show && (
                    <BarcodeScannerComponent
                      width={400}
                      height={500}
                      onUpdate={(err, result) => onUpdateScreen(err, result)}
                    />
                  )}
                  <p>{data}</p>
                </>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setShow(false)}
                aria-label="Close"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPhoto;
