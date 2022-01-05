import React, { useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import path from "../config/url";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = ({ setCinema, setLogged, setTotScreen }) => {
  const username = useRef("");
  const password = useRef("");
  /* const [dateToDay, setDay] = useState(moment().format("YYYY-MM-DD")); */
  /* console.log(path); */
  const URL = path;

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    /* console.log("login value nel submit"); */

    if (!username || !password) {
      alert("campi vuoti");
      return;
    }

    /* console.log("sono nel submit"); */

    try {
      await Axios.post(URL, {
        username: username.current.value,
        password: password.current.value
      })
        .then((res) => {
          /* console.log("login respone", res.data); */
          setCinema(res.data.cinema);
          setTotScreen(res.data.screen);
          setLogged(true);
          return navigate("/tracing");
        })
        .catch((e) => {
          alert("axios del login\n" + e);
          username.current.focus();
          username.current.value = "";
          password.current.value = "";
          return;
        });
    } catch (error) {
      alert(error);
      return;
    }
  };

  const deleteOldRow = async () => {
    var olddate = moment().subtract(15, "days").format("YYYY-MM-DD");

    await Axios.delete(URL, {
      data: { dateToDelete: olddate }
    })
      .then((res) => {
        toast.success(`delete ${res.data.affectedRows} old row`, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      })
      .catch((e) => alert(`errore sul delete di login ${e}`));

    /* console.log(olddate); */
  };

  useEffect(() => {
    deleteOldRow();
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="login-form bg-light mt-4 p-4">
            <form className="row g-3" onSubmit={onSubmit}>
              <h4>Login for start to tracing</h4>
              <div className="col-12">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  ref={username}
                  /* onChange={(event)=>setUser(event.currentTarget.value)} */
                />
              </div>
              <div className="col-12">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  ref={password}
                  /* onChange={(event)=>password=event.current.value} */
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-dark float-end">
                  Login
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <div className="col-6">
              <p className="text-end mb-0 fs-6">dev by Fabio Conti</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
