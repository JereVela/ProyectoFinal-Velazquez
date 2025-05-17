import React, { createContext, useState } from "react";


export const SalesContext = createContext();


const sum = 0;


export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState(sum);

  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
};