import React from "react";
import SelecCampos from "./SelecCampos";

function Index(props) {

  const { columns, open, setOpen, datos, gridStyle } = props;
  return (<>
    {/* <SelecCampos open={open} columns={columns} setOpen={setOpen} /> */}
    {SelecCampos({ open, columns, setOpen, datos, gridStyle })}

    {/* una ves seleccionados los campos si pongo imprimir llamo al componente imprimir pantalla */}
    {/* <ImprimirPantalla /> */}
  </>);
}

export default Index;
