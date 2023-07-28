import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "../css/Login.module.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ipAdd, setIpAdd] = useState("");
  const [takepopinput, setTakepopinput] = useState("");
  const [data, setData] = useState([]);
  const usernameref = useRef();
  const passwordref = useRef();
  const popref = useRef();

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const ipAddHandler = (e) => {
    setIpAdd(e.target.value);
  };
  //console.log(userName, Password, ipAdd);

  const submithandler = async (e) => {
    e.preventDefault();

    const popinput = popref.current.value;

    setTakepopinput(popinput);

    const useradd = usernameref.current.value;
    const passadd = passwordref.current.value;
    //console.log(useradd, passadd);
    await axios
      .post(
        `http://${ipAdd}:3000/login`,
        {
          username: userName,
          password: Password,
        },
        { timeout: 1000 }
      )
      .then((res) => {
        //console.log("result::", res.data, "from loginpage response");
        props.getTokenHandler(res.data.token , ipAdd);
         
        localStorage.setItem('ipAdd',ipAdd)
        localStorage.setItem("token",res.data.token)
        if (res.data.message == "Success") {
          history.push("/CustomerPage");
        }
        toast(res.data.message);
      })
      .catch((error) => {
        //console.log(error, "from error");
        if (error) {
          toast("Please enter  correct IP Address...");
        }
      });
  };

  return (
    <div>
      <div className={classes.loginmain}>
        <div className={classes.login}>
          <div>
            <div>
              <h2>Customer Display</h2>
            </div>
            <div className={classes.formoutline}>
              <form onSubmit={submithandler}>
                <div className={classes.form}>
                  <div>
                    <input
                      type="text"
                      ref={popref}
                      placeholder="Please enter your IP Address"
                      onChange={ipAddHandler}
                      value={ipAdd}
                    ></input>
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={usernameref}
                      placeholder="Username"
                      onChange={userNameHandler}
                      value={userName}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      ref={passwordref}
                      placeholder="Password"
                      onChange={PasswordHandler}
                      value={Password}
                    />
                  </div>
                  <div>
                    <button className="btn btn-dark btn-sm">Connect</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
