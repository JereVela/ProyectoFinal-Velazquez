import { useState, createContext } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) =>{
    const [shopVec, setShopVec] = useState([]);
    return(
        <ShopContext.Provider value={{ shopVec, setShopVec }}>{ children }</ShopContext.Provider>
    )
}