import React, { useEffect, useCallback, useRef } from "react";
import Quagga from "quagga";

export default ({ onScan }) => {
  const quaggaContainer = useRef(null);
  const onDetected = useCallback(
    (results) => {
      if (results && results.codeResult) {
        onScan(results.codeResult.code);
      }
    },
    [onScan]
  );

  useEffect(() => {
    if (quaggaContainer.current) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: quaggaContainer.current,
            constraints: {
              width: 270,
              height: 320,
              facingMode: "environment" // or user
            }
          },
          frequency: 10,
          locator: {
            patchSize: "medium",
            halfSample: true
          },
          numOfWorkers: 2,
          decoder: {
            readers: ["upc_reader"],
            multiple: false
          },
          locate: true
        },
        (err) => {
          if (err) {
            return console.log(err);
          }

          Quagga.start();
        }
      );

      Quagga.onProcessed((result) => {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute("width"), 10),
              parseInt(drawingCanvas.getAttribute("height"), 10)
            );

            result.boxes
              .filter(function (box) {
                return box !== result.box;
              })
              .forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: "green",
                  lineWidth: 2
                });
              });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: "#00F",
              lineWidth: 2
            });
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: "x", y: "y" },
              drawingCtx,
              { color: "red", lineWidth: 3 }
            );
          }
        }
      });

      Quagga.onDetected(onDetected);
    }

    return () => {
      Quagga.offDetected(onDetected);
    };
  }, [quaggaContainer, onDetected]);

  return <div id="interactive" ref={quaggaContainer} />;
};
