import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import ClotheCard from '../../components/ClotheCard/ClotheCard';
import "./categoryPage.css";
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const CategoryPage = () => {
    let {categoryId} = useParams();

    console.log(categoryId);

    const [clothesData,setClothesData] = useState([]); 
    const [isLoading,setIsLoading] = useState(true); 

   useEffect(() =>{
    const getClothesData = async () =>{
      const q = query(collection(db, "products"), where("category", "==", categoryId));
      const docs = []; 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id: doc.id})
      });
      console.log(docs);
      setClothesData(docs)
      setTimeout(() =>{
        setIsLoading(false)
    },3000)
    }
    getClothesData();
  }, [categoryId]);



  return (
    <div>
        {isLoading ? (
            <Spinner />
        ):(
            <div className='grid-container-2'>
                {clothesData.map((clothe) =>{
                    return(
                        <div className='div' key={clothe.id}>
                            <Link to={`/detail-page/${clothe.id}`}>
                                <ClotheCard clothe={clothe}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default CategoryPage