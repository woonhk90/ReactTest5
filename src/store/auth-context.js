import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, //TIP ( 기본컨텍스트에 추가하면 IDE자동완성으로 찾아볼 수 있다. 값은 그냥 더미(아무거도 사용하지 않는) 값(함수)을 지정함 )
});

export default AuthContext;
