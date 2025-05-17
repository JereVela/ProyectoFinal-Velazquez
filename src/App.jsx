import React from 'react'
import { useState, useEffect } from 'react';
import "./App.css";

//Context
import { SalesProvider } from './context/salesContext';
import { ShopProvider } from "./context/ShopContext";

//react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Header from './components/Header/Header';
import NavBar from "./components/NavBar/NavBar"

//Pages
import HomePage from './pages/HomePage/HomePage';
import DetailPage from './pages/DetailPage/DetailPage';
import ShopPage from './pages/ShopPage/ShopPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';

//Firebase
/* import { db } from "./firebase/firebaseConfig"
import { collection, query, where, getDocs } from "firebase/firestore"; */

const App = () => {

  /* const [clothesData,setClothesData] = useState([]); */

  /* useEffect(() =>{
    const getClothesData = async () =>{
      const q = query(collection(db, "clotesCollection"));
      const docs = []; 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id: doc.id})
      });
      console.log(docs);
    }
    getClothesData();
  }, []); */

  return (
    <Router>
      <SalesProvider>
        <ShopProvider>
        <div className='App'>
          <Header />
          <NavBar/> 
            <Routes>
              <Route path='/' element={<HomePage />}/>
              <Route path='/detail-page/:id' element={<DetailPage />}/>
              <Route path='/shop' element={<ShopPage />}/>
              <Route path='/category/:categoryId' element={<CategoryPage />}/>
            </Routes> 
        </div>
        </ShopProvider>
      </SalesProvider>
    </Router>
  )

}

export default App