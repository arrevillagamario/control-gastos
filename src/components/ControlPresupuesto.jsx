import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {

  const [disponible, setDisponible]=useState(0);
  const [gastado, setGastado]=useState(0);
  const [porcentaje, setPorcentaje]=useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce((total,gasto)=> gasto.cantidad + total,0)
    const totalDisponible=presupuesto-totalGastado;
    setDisponible(totalDisponible)
    setGastado(totalGastado)

    //calcular porcentaje gastado
    const nuevoPorcentaje=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);
    console.log(nuevoPorcentaje)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);
  }, [gastos])
  
  const handleResetApp=()=>{
    const resultado=window.confirm('¿Deseas reiniciar tu presupuesto y tus gastos?')

    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
    
  }
  
  const formatearCantidad=(cantidad)=>{
    return cantidad.toLocaleString('en-US',{
      style:'currency',
      currency:'USD'
    })
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
              styles={buildStyles({
                pathColor: porcentaje>99?'#DC2626':'#07155C',
                trailColor: '#A2ABA7',
                textColor: porcentaje>99?'#DC2626':'#07155C',
              })}
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
              
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>Reiniciar Datos</button>
            <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
            <p className={`${disponible<0?'negativo':'positivo'}`}><span>Disponible: </span>{formatearCantidad(disponible)}</p>
            <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto