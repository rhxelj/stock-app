import React from "react";
import { Route } from "react-router-dom";

import StkMonedas from "./pages/Monedas/StkMonedas";
import Proveedores from "./pages/Stock/Proveedores/Proveedores.jsx";
import Clientes from "./pages/Clientes/Clientes.jsx";
import StkUnMed from "./pages/Stock/UnidadMedidas/StkUnMed.jsx";
import StkRubro from "./pages/Stock/Rubros/StkRubro";
import StkGrupo from "./pages/Stock/Grupos/StkGrupo.jsx";
import StkUbFisica from "./pages/Stock/UbicacionFisica/StkUbFisica";
import ListaPrecios from "./pages/ListaPrecios/ListaPrecios";
import ModPrecios from "./pages/ListaPrecios/ModPrecios";
import StkMovEntrada from "./pages/Stock/Movimientos/Entrada/StkMovEntrada";
import StkMovSalida from "./pages/Stock/Movimientos/Salida/StkMovSalida";
import StkMovSalidaFinal from "./pages/Stock/Movimientos/Salida/LayoutMovSalidaFinal/StkMovSalidaFinal";
// import StkMovimiento from './pages/z_SinClasificarMirar/StkMovimiento'
import StkItems from "./pages/Stock/Items/StkItems";

import PresupPant from "./pages/Presupuesto/PresupPant.js";
import PresupuestoUnid from "./pages/Presupuesto/PresupuestoUnid.js";
import PresupPantVie from "./pages/Presupuesto/PresupPantVie.js";
import ImprimeQR from "./pages/Impresion/ImprimeQR";
// TODO 👀📐 nothing changed here, just auto-formatting
// all this auto-formatting is coming from the Prettier extension
// https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
// and the setting "format on save"
// check out my fave extensions for vs code at https://shortcut.school/vs-code#extensions 😎

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
      <Route path="/StkMonedas" component={StkMonedas} />
      <Route path="/Proveedores" component={Proveedores} />
      <Route path="/Clientes" component={Clientes} />
      <Route path="/StkUnMed" component={StkUnMed} />
      {/* <Route path="/StkMovimiento"     component={StkMovimiento}/> */}
      <Route path="/StkMovSalida" component={StkMovSalida} />
      <Route path="/StkMovSalidaFinal" component={StkMovSalidaFinal} />
      <Route path="/ListaPrecios" component={ListaPrecios} />
      <Route path="/PresupPant" component={PresupPant} />
      <Route path="/PresupPantVie" component={PresupPantVie} />
      <Route path="/PresupuestoUnid" component={PresupuestoUnid} />
      <Route path="/ImprimeQR" component={ImprimeQR} />
      <Route path="/StkRubro" component={StkRubro} />
      <Route path="/StkGrupo" component={StkGrupo} />
      <Route path="/StkItems" component={StkItems} />
      <Route path="/StkMovEntrada" component={StkMovEntrada} />
      <Route path="/StkUbFisica" component={StkUbFisica} />
      <Route path="/ModPrecios" component={ModPrecios} />
      {/* <Route path="/AgregarMonedas" component={AgregarMonedas}/> */}
      {/* <Route path="/BorrarMonedas" component={BorrarMonedas}/> */}
      {/* <Route path="/ModificarMonedas" component={ModificarMonedas}/> */}
      {/* <Route path="/LeerMonedas" component={LeerMonedas}/> */}
      {/* <Route  component={About}/> para captar las rutas no definidas tengo que importar Switch */}
    </div>
  </main>
);

export default Main;
