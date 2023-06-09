import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "../css/Login.module.css";
import axios from "axios";
import { error } from "jquery";
function LoginPage(props) {
  const history = useHistory();

  const [showpop, setShowpop] = useState(true);
  const [showloing, setshowLogin] = useState(false);
  const [takepopinput, setTakepopinput] = useState("");
  const [data, setData] = useState([]);
  const usernameref = useRef();
  const passwordref = useRef();
  const popref = useRef();

  const submithandler = async (e) => {
    e.preventDefault();

    const useradd = usernameref.current.value;
    const passadd = passwordref.current.value;
    console.log(useradd, passadd);
    await axios
      .post(`http://${takepopinput}:3000/login`, {
        username: useradd,
        password: passadd,
      })
      .then((res) => {
        console.log("result::", res.data);
        props.getTokenHandler(res.data.token)
        alert(res.data.message);
        if (res.data.message == "Success") {
          history.push("/CustomerPage");
        }
      })
      .catch((error) => {
        console.log(error.message, "from error");
      });
  };

  const popsubmitHandler = (e) => {
    e.preventDefault();
    const popinput = popref.current.value;

    setTakepopinput(popinput);
    setShowpop(false);
    setshowLogin(true);
  };
  console.log(takepopinput, "form pop sumit handler");
  console.log(data);

  return (
    <div>
      {showloing && (
        <div className={classes.login}>
          <div>
            <div>
              <h6>{`Foodies-World`}</h6>
            </div>
            <div className={classes.formoutline}>
              <form onSubmit={submithandler}>
                <div className={classes.form}>
                  <div>
                    <input
                      type="text"
                      ref={usernameref}
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      ref={passwordref}
                      placeholder="Password"
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
      )}
      {/********************* */}
      {showpop && (
        <div>
          <div className={classes.top}>
            <div>
              <div>
                <h6>Altantic POS found...</h6>
              </div>
              <div className={classes.popup}>
                <div>
                  <p>{`Foodies-World`}</p>
                  <p>
                    {data.map((item) => (
                      <span key={item.ip}>{item.ip}</span>
                    ))}{" "}
                  </p>
                </div>
                <form onSubmit={popsubmitHandler}>
                  <div className={classes.input}>
                    <input
                      type="text"
                      ref={popref}
                      placeholder="Please enter your IP Address"
                    ></input>
                  </div>
                  <div>
                    <button className="btn btn-dark btn-sm">Connect</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
