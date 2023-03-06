import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("EFFECT RUNNING");
    /* ------------------------- 의존성의 정보가 없을 때 []=>없을 때 ------------------------- */
    /* ---------------- 컴포넌트가 처음(계속) 렌더링될 때, state가 업데이트될 때마다 실행 ---------------- */
    /* ------------------------ 모든 컴포넌트 렌더링 주기 후에 실행되기 때문 ----------------------- */

    /* ------------------------- 의존성의 정보가 있을 때 []=>있을 때 ------------------------- */
    /* ---------------------- 컴포넌트가 처음으로 마운트되고 렌더링될 때만 실행된다 --------------------- */
    /* --------------------- 의존성 배열에 있는 state가 변경될 때마다도 실행된다 -------------------- */
    return () => {
      console.log("EFFECT CLEANUP");
      /* -------------- state함수가 실행되기 전에 동작한다 (처음 실행되기 전에는 실행되지 않는다) -------------- */

      /* ------------------ 의존성 정보가 있을경우 해당 stste함수가 실행되면 그 전에 동작 ----------------- */

      /* ---------------------- 의존성 정보가 없을경우 컴포넌트가 제거되면 실행된다 ---------------------- */
      /* -------------------- ex) 로그인하고 컴포넌트가 DOM에서 제거되면 클린업 동작 ------------------- */
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Checking form validity!");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
