import React, { useEffect, useState } from "react";
import '../../../../Styles/TableHeader.css'
import MaterialTable from "material-table";
import { tableIcons } from "../../../lib/material-table/tableIcons";
import { llenarColumns } from "./columns"
import { leerClientes } from "./ClientesLeer";
import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { HeaderTitle } from '../../../lib/HeaderTitle'
import { localization } from "../../../lib/material-table/localization";
import Imprimir from "../Impresion/Imprimir/Imprimir";

export default function Clientes() {
  HeaderTitle("Clientes")

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

  async function columnsFetch() {
    const col = await llenarColumns();
    setColumns(() => col)
  }

  async function dataFetch() {
    const data = await leerClientes();
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
        actions={[
          {
            icon: () => <tableIcons.Print />,
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: () => setImprimirTF({ imprimir: true }),
          },
        ]}
        title=""
        localization={localization}
        icons={tableIcons}
        columns={columns}
        data={data}

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
          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => dataFetch()),
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





