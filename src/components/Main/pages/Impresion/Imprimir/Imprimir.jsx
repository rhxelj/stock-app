import React, { Component, useState, useEffect } from "react";
import SelecCampos from "./SelecCampos";
import ImprimirPantalla from "../ImprimirPantalla";

function Index(props) {
  const [state, setState] = useState("");

  const { columns, open, setOpen, datos } = props;
  console.log("datos en Imprimirr.js")
  console.log(datos)
  return (<>
    {/* <SelecCampos open={open} columns={columns} setOpen={setOpen} /> */}
    {SelecCampos({ open, columns, setOpen, datos })}

    {/* una ves seleccionados los campos si pongo imprimir llamo al componente imprimir pantalla */}
    {/* <ImprimirPantalla /> */}
  </>);
}

export default Index;
