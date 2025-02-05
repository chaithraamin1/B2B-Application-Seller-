// src/context/CartContext.js
import React, { createContext, useState,useEffect} from 'react';



// Create a context for the cart
export const ApiContext = createContext(null);

const ApiProvider = (props) => {
const [menus,setMenuList]=useState();

    
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:8080/api/get/product/category")
        .then((response) => {
          console.log("menu", response);
          setMenuList(response.data);
          console.log("menuList", menu_list);
        //   localStorage.setItem("menus", JSON.stringify(response.data));
        });
    };
    fetchData();
  }, []);
    


const apiValue = {
    menus
};

  return (
    <ApiContext.Provider value={{apiValue}}>
      {props.children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;