import React, { useState } from "react";
import CustomerPage from "./Component/CustomerPage";

import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LoginPage from "./Component/LoginPage";

function App() {
  const [token, setToken] = useState("");
  const [ipadd, setipadd] = useState("");
  const getTokenHandler = (logintoken, ipaddress) => {
    setToken(logintoken);

    setipadd(ipaddress);
    console.log(ipaddress, "from app component");
  };
  let tokenstorage = localStorage.getItem('token')
  return (
    <div className="app">
      <Switch>
        <Route path="/Loginpage">
          <LoginPage getTokenHandler={getTokenHandler} />
        </Route>
        <Route path="/CustomerPage">
          {tokenstorage && <CustomerPage token={token} ipadd={ipadd} />}
        </Route>
        <Route path="*">
          <Redirect to="/Loginpage" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
