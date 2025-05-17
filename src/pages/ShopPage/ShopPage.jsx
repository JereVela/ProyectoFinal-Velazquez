import React, { useEffect } from 'react'
import "./ShopPage.css"
import { useState, useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { TextField } from '@mui/material'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import CargaCompleta from '../../components/CargaCompletada/CargaCompletada';

import { SalesContext } from '../../context/salesContext'

const initialState = {
    name:"",
    lastName:"",
    email:"",
    confirmEmail:"",
};

const ShopPage = () => {
    const { shopVec,setShopVec } = useContext(ShopContext);
    const {setSales} = useContext(SalesContext);
    const [precioTotal,setPrecioTotal] = useState(0);
    const [idCompra,setIdCompra] = useState("");
    
    const [values, setValues] = useState(initialState);

    const vecCompras = [];    

    shopVec.map((item) => {
        item.map((clothe)=>{
            vecCompras.push(clothe)
        })
    })

    console.log("soyVecCompras", vecCompras)
        


    useEffect(() =>{
        let valorTotal = 0
        shopVec.forEach((item) => {
            item.forEach((clothe) =>{
                valorTotal += clothe.salePrice;
            })
        });
        setPrecioTotal(valorTotal)
    },[shopVec])

    const handlerOnChange = (e) =>{
        const {value, name} = e.target;
        setValues({...values, [name]: value})
    }

    const handlerOnSubmit = async(e) =>{
        e.preventDefault();
        console.log(values)
        // añado shopVec a values
            if(values.email === values.confirmEmail){
            const docRef = await addDoc(collection(db, "purchaseCollection"), {
                values,
                vecCompras
            });
            console.log("Document written with ID: ", docRef.id);
            setIdCompra(docRef.id)
            setValues(initialState);
            setShopVec([])
            setSales(0)
        }else{
            alert("Los mails son distintos, por favor ingrese los mismos")
        }
    }
    
    console.log(values);
    console.log("Hola soy precio total: ",precioTotal);
    return (
        <div className='ShopPage'>
            <table>
                <thead>
                    <tr>
                        <td>Img</td>
                        <td>Nombre</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                    </tr>
                </thead>
                <tbody>
                    {shopVec.map((item) => {
                        return item.map((clothe, clotheIndex) => {     
                            return (
                                <tr key={clotheIndex}>
                                    <td key={clotheIndex}>
                                        <img src={clothe.img} alt="" />
                                    </td>
                                    <td>{clothe.name}</td>
                                    <td>{clothe.price}</td>
                                    <td>{clothe.cantUnits}</td>
                                </tr>
                            );
                        });
                    })}
                </tbody>
            </table>

            {precioTotal === 0 ? (<h2>Por Favor, ingrese algun elemento a su carrito</h2>
                ):(
                    <div className='container-1'>
                        <form className='formContainer' onSubmit={handlerOnSubmit}>
                            <TextField 
                                placeholder='name'
                                style={{margin: "10", width:"400px"}}
                                name='name'
                                value={values.name}
                                onChange={handlerOnChange}
                                required
                            />
                            <TextField 
                                placeholder='Last-Name'
                                style={{margin: "10", width:"400px"}}
                                name='lastName'
                                value={values.lastName}
                                onChange={handlerOnChange}
                                required
                            />
                            <TextField 
                                placeholder='email'
                                style={{margin: "10", width:"400px"}}
                                name='email'
                                value={values.email}
                                onChange={handlerOnChange}
                                required
                            />
                            <TextField 
                                placeholder='Confirm email'
                                style={{margin: "10", width:"400px"}}
                                name='confirmEmail'
                                value={values.confirmEmail}
                                onChange={handlerOnChange}
                                required
                            />

                            <button className='btnForm'>Send</button>
                            
                        </form>
                    </div>
                )}
                
                {idCompra != "" ? (
                    <CargaCompleta idCompra={idCompra}/>
                ):(
                    null
                )};
        </div>
    );
}

export default ShopPage