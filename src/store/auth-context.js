import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, //TIP ( 기본컨텍스트에 추가하면 IDE자동완성으로 찾아볼 수 있다. 값은 그냥 더미(아무거도 사용하지 않는) 값(함수)을 지정함 )
  onLogin: (email, password) => {},
});

/* ------------ 선호나 사용 사례 및 앱의 크기에 따라 사용해도 되고 안해도 됨 ( 선택사항!!!! ) ------------ */

/* --------------------------- 더 많은 조릭을 가져오고 싶을 경우 -------------------------- */
/* ---------------- 앱 컴포넌트에서 그리고 별도의 컨텍스트 관리 컴포넌트를 만들고 싶을 경우 ---------------- */

/* --------------------- AuthContext.Provider를 반환 하는 곳임 --------------------- */
/* --------------- children으로 props를 받아, 들어오는 모든 것을 그냥 전달하면 됨 --------------- */
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  /* ------------------------------ 전체 인증 state를 ------------------------------ */
  /* ---------------- 이 별도(AuthContextProvider)의 공급자 컴포넌트에서 관리 ---------------- */
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
