import React, { useState, useEffect } from "react";

import { leerMonedas } from "./StkMonedasLeer";
import { agregarMonedas } from "./StkMonedasAgregar";
import { borrarMonedas } from "./StkMonedasBorrar";
import { modificarMonedas } from "./StkMonedasModificar";

import { withStyles } from "@material-ui/core/styles";
import "../../../../Styles/TableHeader.css";

import MaterialTable from "material-table";
import {
  // style,
  styles,
  // CustomTableCell,
  initial_state,
  initial_open,
} from "./Constants";
import { tableIcons } from "./Constants";
import { columns } from "./StkTableColumnsMonedas";

// import SelecCampos from "../Impresion/Imprimir/SelecCampos";
import Imprimir from "../Impresion/Imprimir/Imprimir";

import { HeaderTitle } from "../../../lib/HeaderTitle";
import { localization } from "../../../lib/material-table/localization";

// import Imprimir from "../Impresion/Imprimir/indexwww";

// import { useContext } from "react";
// import { globalContext } from "../../../App";

function Monedas() {
  HeaderTitle("Monedas");
  const [data, setData] = useState(initial_state);
  const [imprimirTF, setImprimirTF] = useState(initial_open);
  // const { valor, setValor } = useContext(globalContext);

  async function initialFetch() {
    const monedas = await leerMonedas();

    setData(monedas);
  }

  function onRowAdd() {
    return (newData) =>
      new Promise((resolve, reject) => {
        agregarMonedas(newData);
        initialFetch();
        resolve();
      }, 1000);
  }

  function onRowUpdate() {
    return (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          // {
          modificarMonedas(newData);
          initialFetch();
          // }
          resolve();
        }, 1000);
      });
  }

  function onRowDelete() {
    return (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          // {
          borrarMonedas(oldData.idStkMonedas);
          initialFetch();
          // }
          resolve();
        }, 1000);
      });
  }

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        localization={localization}
        title=""
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => <tableIcons.Print />,
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: (event) => setImprimirTF({ imprimir: true }),
          },
        ]}
        options={{
          exportAllData: true,
          exportButton: true,
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: onRowAdd(),
          onRowUpdate: onRowUpdate(),
          onRowDelete: onRowDelete(),
        }}
      />
      <Imprimir
        columns={columns}
        datos={data}
        open={imprimirTF.imprimir}
        setOpen={setImprimirTF}
      />
    </div>
  );
}

export default withStyles(styles)(Monedas);
