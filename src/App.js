import React from "react";
import "./style.css";
import Login from "./component/login";
import Tracing from "./component/tracing";
import Navbar from "./component/navbar";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  const [cinema, setCinema] = useState("");
  const [totScreen, setTotScreen] = useState("");
  const [isLogged, setLogged] = useState(false);

  return (
    <div>
      <div className="container-fluid">
        <Router>
          <Navbar isLogged={isLogged} />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setScreen={setTotScreen}
                  setCinema={setCinema}
                  setLogged={setLogged}
                />
              }
            />
            <Route
              path="login"
              element={
                <Login
                  setCinema={setCinema}
                  setScreen={setTotScreen}
                  setLogged={setLogged}
                />
              }
            />
            <Route
              path="tracing"
              element={<Tracing cinema={cinema} screen={totScreen} />}
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
