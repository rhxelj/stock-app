import React, { useEffect, useState } from "react";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

// Para MaterialTable
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import { columns } from "./StkUbFisica_Columns"
import { StkUbFisica_Data } from "./StkUbFisica_Data"

import { onRowAdd } from "./onRowAdd"
import { onRowDelete } from "./onRowDelete"


import { HeaderTitle } from "../../../../lib/HeaderTitle"
import Imprimir from "../../Impresion/Imprimir/Imprimir";
export default function StkUbFisica() {


  HeaderTitle("Ubicacion Fisica")

  // const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

  // async function columnsFetch() {
  //   const col = await llenarColumns();
  //   setColumns(() => col)
  // }

  async function dataFetch() {
    const data = await StkUbFisica_Data();
    setData(data);
  }

  async function initialFetch() {

    // columnsFetch()
    dataFetch();
  }

  useEffect(() => {
    initialFetch()
  }, []);

  return (
    <div>
      <MaterialTable
        actions={[
          {
            icon: () => <tableIcons.Print />,
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: (event) => setImprimirTF({ imprimir: true }),
          },
        ]}
        title=""
        columns={columns}
        data={data}
        icons={tableIcons}
        localization={localization}

        options={{
          exportAllData: true,
          exportButton: true,
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          // tableLayout: "fixed", //con esta opcion entran todas las columnas en la pantalla pero superpone informacion
        }}

        editable={{
          onRowAdd: newData =>
            onRowAdd(newData).then(() => dataFetch()),
          // onRowUpdate: (newData, oldData) =>
          //   onRowUpdate(newData, oldData).then(() => dataFetch()),
          onRowDelete: oldData =>
            onRowDelete(oldData).then(() => dataFetch()),
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

