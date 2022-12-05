import React, { useState } from "react";

export const mainContext = React.createContext({});

export const MainProvider = (props) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  
  return (
    <mainContext.Provider value={
      {
        token, setToken, user, setUser
      }}>
      {props.children}
    </mainContext.Provider>
  );
};

export const useProvider = () => React.useContext(mainContext);