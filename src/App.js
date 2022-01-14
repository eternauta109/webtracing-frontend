import React from "react";
import "./style.css";
import Login from "./component/login";
import Show from "./component/show";
import Tracing from "./component/tracing";
import Navbar from "./component/navbar";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  const [cinema, setCinema] = useState("");
  const [totScreen, setTotScreen] = useState(0);
  const [isLogged, setLogged] = useState(false);

  return (
    <div>
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setTotScreen={setTotScreen}
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
                  setTotScreen={setTotScreen}
                  setLogged={setLogged}
                />
              }
            />
            <Route
              path="tracing"
              element={
                <>
                  <Navbar isLogged={isLogged} />
                  <Tracing cinema={cinema} totScreen={totScreen} />
                </>
              }
            />
            <Route
              path="show"
              element={
                <>
                  <Navbar isLogged={isLogged} />
                  <Show />
                </>
              }
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
