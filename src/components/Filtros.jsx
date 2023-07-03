import { useState, useEffect } from 'react'
const Filtros = ({filtro,setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className="campo">
                <label htmlFor="">
                    Filtrar Gastos
                </label>
                <select name="" id="" value={filtro} onChange={e=>setFiltro(e.target.value)}>
                    <option value="">--- Todas las categorías ---</option>
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
        </form>
    </div>
  )
}

export default Filtros