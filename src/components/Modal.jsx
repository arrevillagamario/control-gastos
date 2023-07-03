import React from 'react'
import { useState,useEffect } from 'react'
import CerrarBtn from "../img/cerrar.svg"
import Mensaje from './Mensaje'
const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {
    const [mensaje,setMensaje]=useState('')
    
    const [nombre,setNombre]= useState('');
    const [cantidad, setCantidad]=useState('');
    const [categoria, setCategoria]=useState('');
    const [id,setId]=useState('');
    const [fecha,setFecha]=useState('');
    useEffect(() => {
      if(Object.keys(gastoEditar).length>0)
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
    }, [])
    

    const ocultarModal=()=>{
        
      setAnimarModal(false)
      setGastoEditar({})
      setTimeout(() => {
        setModal(false)    
      }, 500);
    }
    const handdleSubmit =e =>{
      e.preventDefault();
      if ([nombre,cantidad,categoria].includes('')) {
        setMensaje('Todos los campos son obligatorios')
        setTimeout(() => {
          setMensaje('')
        }, 3000);
      }
      else
      guardarGasto({nombre,cantidad,categoria,id, fecha})
    }
    
    

   
    
  return (
    <div className="modal">
       <div className='cerrar-modal'>
        <img src={CerrarBtn} onClick={ocultarModal} alt="Cerrar Modal" />   
       </div>

       <form className={`formulario ${animarModal?"animar":"cerrar"}`} onSubmit={handdleSubmit}>
        <legend>{gastoEditar.nombre?'Editar Gasto':'Nuevo Gasto'}</legend>
        {mensaje&&<Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className='campo'>
          <label htmlFor="nombre">Nombre Gasto</label>
          <input id='nombre' type="text" placeholder='Añade el nombre del gasto' value={nombre} onChange={e=>setNombre(e.target.value)} />
        </div>
        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>
          <input type="number" placeholder='Añade la cantidad del gasto' id='cantidad' value={cantidad} onChange={e=>setCantidad(Number(e.target.value))}/>
        </div>
        <div className='campo'>
          <label htmlFor="categoria">Categoria</label>
          <select name="categoria" id="categoria" value={categoria} onChange={e=>setCategoria(e.target.value)}>
            <option value="">--- Seleccione ---</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Educacion">Educación</option>
            <option value="Subscripciones">Subscripciones</option>
            <option value="Salidas">Salidas</option>
            <option value="Transporte">Transporte</option>
          </select>
        </div>
        <div className='campo'>
          <input type="submit" value={gastoEditar.nombre?'Guardar Cambios':'Añadir Gasto'} />
        </div>
       </form>
       
       
    </div>
  )
}

export default Modal