// import "./pages/bootstrap"
import React from 'react'
import { Route } from 'react-router-dom'

// import Posts from './pages/Posts';
// import Post from './pages/Post';
// import About from './pages/About';
// import NewPost from './pages/NewPost';
// import AgregarMonedas from './pages/AgregarMonedas'
// import ReadComponent from './pages/ReadComponent'
// import UpdateComponent from './pages/UpdateComponent'
//import DeleteComponent from './pages/DeleteComponent'

import StkMonedas   from './pages/Monedas/StkMonedas'
import Proveedores  from './pages/Proveedores/Proveedores'
import StkUnMed     from './pages/UnidadMedidas/StkUnMed'
import StkRubro     from './pages/Rubros/StkRubro'
import StkGrupo     from './pages/Grupos/StkGrupo';
import StkUbFisica from './pages/UbicacionFisica/StkUbFisica'
import ListaPrecios from './pages/ListaPrecios/ListaPrecios'
import StkMovEntrada     from './pages/Movimientos/Entrada/StkMovEntrada';
import StkMovSalida from './pages/Movimientos/Salida/StkMovSalida'
import StkSalidaFinal from './pages/Movimientos/Salida/StkSalidaFinal'
// import StkMovimiento from './pages/z_SinClasificarMirar/StkMovimiento'
import StkItems from './pages/Items/StkItems'


const Main = () => (
    <main>
        
        {/* 
            Para poder usar la opción que si no encuentra la ruta especificada tire un error. tengo que usar swicth como wrapper
            de lo contrario el error se va a mostrar en todas las paginas 

            <Route component={Error}/> 
            uso esta ruta para cuando no coincide ninguna ruta (hay que hacer el componente Error)
        */}
        
        <div className="container"> 
            {/* <Route exact path="/" component={LeerMonedas}/> */}
            <Route path="/StkMonedas"   component={StkMonedas}/>
            <Route path="/Proveedores"  component={Proveedores}/>
            <Route path="/StkUnMed"     component={StkUnMed}/>
            {/* <Route path="/StkMovimiento"     component={StkMovimiento}/> */}
            <Route path="/StkMovSalida"     component={StkMovSalida}/>
            <Route path="/StkSalidaFinal"     component={StkSalidaFinal}/>
            <Route path="/ListaPrecios"     component={ListaPrecios}/>
            <Route path="/StkRubro"     component={StkRubro}/>
            <Route path="/StkGrupo"     component={StkGrupo}/>
            <Route path="/StkItems"     component={StkItems}/>
            <Route path="/StkMovEntrada"     component={StkMovEntrada}/>
            <Route path="/StkUbFisica"     component={StkUbFisica}/>
            {/* <Route path="/AgregarMonedas" component={AgregarMonedas}/> */}
            {/* <Route path="/BorrarMonedas" component={BorrarMonedas}/> */}
            {/* <Route path="/ModificarMonedas" component={ModificarMonedas}/> */}
            {/* <Route path="/LeerMonedas" component={LeerMonedas}/> */}
            {/* <Route  component={About}/> para captar las rutas no definidas tengo que importar Switch */}
        </div>
    </main>
)

export default Main