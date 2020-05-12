import React, { useEffect, useState } from "react";
import "../../../../../Styles/TableHeader.css";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { llenarColumns } from "./columns"
import { leerProveedores } from "./ProveedoresLeer";
import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { HeaderTitle } from "../../../../lib/HeaderTitle"

export default function Proveedores() {
  HeaderTitle("Proveedores")

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);


  async function columnsFetch() {
    const col = await llenarColumns();
    setColumns(() => col)
  }

  async function dataFetch() {
    const data = await leerProveedores();
    setData(data);
  }

  async function initialFetch() {

    columnsFetch()
    dataFetch();
  }

  useEffect(() => {
    initialFetch()
  }, []);

  return (
    <div>
      <MaterialTable
        title="PROVEEDORES"
        icons={tableIcons}
        columns={columns}
        data={data}

        options={{
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          // tableLayout: "fixed", //con esta opcion entran todas las columnas en la pantalla pero superpone informacion
        }}

        editable={{
          onRowAdd: newData =>
            onRowAdd(newData).then(() => dataFetch()),
          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => dataFetch()),
          onRowDelete: oldData =>
            onRowDelete(oldData).then(() => dataFetch()),
        }}
      />
    </div>
  );
}





