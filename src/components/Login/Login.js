import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

/* ------------------------- 최신 state 스냅샷, 디스패치된 액션 ------------------------- */
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  /* --------- [최신 state 스냅샷, state 스냅샷을 업데이트할 수 있게 해주는 함수(액션을 디스패치함)] -------- */
  /* -------- useReducer(최신 state 스냅샷을 가져오는 함수(액션을 소비함),초기 state,초기 함수) ------- */
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

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

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(passwordState.isValid && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
