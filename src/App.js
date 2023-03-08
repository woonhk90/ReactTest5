import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const v = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!v.isLoggedIn && <Login />}
        {v.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
