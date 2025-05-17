import React, { useState } from 'react'
import { useEffect } from 'react';
import "./ClotheListContainer.css"
import { Link } from 'react-router-dom';

//Firebase
import { db } from "../../firebase/firebaseConfig"
import { collection, query, where, getDocs } from "firebase/firestore";

//Components
import ClotheCard from '../ClotheCard/ClotheCard';


const ClotheListContainer = () => {

    const [clothes,setClothes] = useState([])

    useEffect(() =>{
        const getClothesData = async () =>{
          const q = query(collection(db, "products"));
          const docs = []; 
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id})
          });
          console.log(docs);
          setClothes(docs)
        }
        getClothesData();
      }, []);

      console.log(clothes);
      

  return (
    <div className='container-grid'>
        {clothes.map((clothe) =>{
          return(
            <Link to={`/detail-page/${clothe.id}`} key={clothe.id}>
              <ClotheCard clothe={clothe}/>
            </Link>
          )
        })}
    </div>
  )
}

export default ClotheListContainer 