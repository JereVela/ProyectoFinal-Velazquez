import React from 'react';
import { useState, useEffect,useContext } from 'react'
import { useParams } from 'react-router';
import "./DetailPage.css";
import { Button } from '@mui/material';





//Firestore
import { db } from "../../firebase/firebaseConfig"
import { collection, query, where, getDocs, documentId } from "firebase/firestore";


//Components
import ClotheCard from '../../components/ClotheCard/ClotheCard';
import { Link } from 'react-router-dom';
import { AddIconn } from '../../components/AddIcon/AddIcon';
import RemoveIconn from '../../components/RemoveIcon/RemoveIcon';
import Spinner from '../../components/Spinner/Spinner';

//Context
import { SalesContext } from '../../context/salesContext';
import { ShopContext } from '../../context/ShopContext';

const DetailPage = () => {
    const [clotheCant, setClotheCant] = useState(0);
    const [cantUnits, setCantUnits] = useState(0);
    const [price,setPrice] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    const [clothe,SetClothe] = useState({});
    const {sales,setSales} = useContext(SalesContext);    
    let { id } = useParams();
    const {shopVec, setShopVec} = useContext(ShopContext);
    let precioCero = true;
    

    
    
    useEffect(() =>{
          const getClothesData = async () =>{
          const q = query(collection(db, "products"), where(documentId(), "==", id));
          const docs = []; 
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id})
          });
          SetClothe(docs)
        }
        getClothesData();
        setTimeout(() =>{
            setIsLoading(false)
        },3000)
    }, [id]);

    console.log(clothe)
    //funcion para boton de suma
    const handlerSum = () =>{
      setPrice(price + clothe[0].price);
      setSales(sales + 1);
      setClotheCant(clotheCant + 1);
      setCantUnits(cantUnits + 1)
    }
    const handlerRest = () =>{
      if(price != 0){
        setPrice(price - clothe[0].price);
        setClotheCant(clotheCant - 1);
      }
      if(sales != 0){
        setSales(sales - 1);
        setCantUnits(cantUnits - 1)
      }
    }

  const handlerCarrito = () =>{
    if(price!=0){
      precioCero = false;
      
    }else{
      precioCero = true;
      
    }
    
    if(!precioCero){
    precioCero = false;
    const vecCar = [];
    const vecHelper = shopVec; 
    vecCar.push({...clothe[0], salePrice: price, cantUnits: cantUnits});
    const updateObject = [...vecHelper, vecCar]
    console.log(updateObject);
    setShopVec(updateObject)

    //Reseto price
    setPrice(0);

    }else{
      console.log("Debe agregar al menos un producto")
    }
  }
  console.log("cant Units",cantUnits);
  return (
    <div className='mayor-container'>
        {isLoading ? (
          <Spinner />
        ): (
          <div className='grid-container'>
            <div className='box-1'>
              <img src={clothe[0].img} alt="" className='img'/> 
            </div>
            <div className='box-2'>
              <h2>{clothe[0].name}</h2>
              <h3>Descripcion: {clothe[0].description} </h3>
              <p>Precio: $<b>{clothe[0].price}</b></p>
              <p>Categoria: <span>{clothe[0].type}</span></p>
            </div>
            <div className='box-3'>
              <Button variant="contained" onClick={handlerCarrito}>Agregar al carrito</Button>
              <div className='btn-container'>
                <button onClick={handlerRest}>        
                  <RemoveIconn />
                </button>
                <button onClick={handlerSum}>        
                  <AddIconn />
                </button>
              </div>
              <p>Precio total: ${price}</p>
              <b>Para agregar al carrito, por lo menos requiere una unidad</b>
            </div>
            {/* <img src={clothe[0].img} alt="" /> */}
          </div>
          )}
    </div>
  )
}

export default DetailPage