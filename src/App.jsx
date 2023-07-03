import Header from "./components/Header"
import { useState, useEffect } from "react"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from "./components/Modal"
import { generarId } from "./helpers/index"
import ListadoGastos from "./components/ListadoGastos"
import Filtros from "./components/Filtros"


function App() {
  const [gastos,setGastos]=useState( JSON.parse(localStorage.getItem('gastos'))??[]
  );
  const [presupuesto, setPresupuesto]=useState(
    Number(localStorage.getItem('presupuesto'))??0
  )
  const [isValidPresupuesto, setIsValidPresupuesto]=useState(false)
  const [modal, setModal]=useState(false)
  const [animarModal, setAnimarModal]=useState(false)
  const [gastoEditar, setGastoEditar]=useState({})
  const [filtro, setFiltro]=useState('')
  const [gastosFiltrados, setGastosFiltrados]=useState([])
  useEffect(() => {
    if (Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(() => {
      setAnimarModal(true)
    },500);
    }
  }, [gastoEditar])
  
  const handleNuevoGasto=()=>{
    setGastoEditar({})
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    },500);
  }
  const guardarGasto=gasto=>{
    if(gasto.id){
      const gastosActua=gastos.map(gastoState=>gastoState.id===gasto.id?gasto:gastoState)
      setGastos(gastosActua)
      setGastoEditar({})
    }else{
      gasto.id=generarId()
      gasto.fecha=Date.now();
      setGastos([...gastos, gasto])
    }
    
    setAnimarModal(false)

        setTimeout(() => {
          setModal(false)    
        }, 500);
    
  }
  const eliminarGasto=id=>{
    const gastosActua=gastos.filter(gasto=>gasto.id!==id);
    console.log(gastosActua)
    setGastos(gastosActua)
  }

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos',JSON.stringify(gastos)??[]);
  }, [gastos])
  
  
  useEffect(() => {
    const presupuestoLS=Number(localStorage.getItem('presupuesto')??0)
    if (presupuestoLS >0){
      setIsValidPresupuesto(true)
    }
  }, [])
  
  useEffect(() => {
      const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro)
      setGastosFiltrados(gastosFiltrados)
  }, [filtro])
  
  return (
    <div className={modal?'fijar':''}>
    
    <Header
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      setGastos={setGastos}
    />
    {isValidPresupuesto&&(
        <div>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="Icono nuevo gasto" onClick={handleNuevoGasto}/>
          </div>
        </div>
      )
    }
    {modal&&(
      <Modal 
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />
    )}
    </div>
  )
}

export default App
