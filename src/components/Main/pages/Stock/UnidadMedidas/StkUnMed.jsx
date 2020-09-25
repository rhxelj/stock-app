import React, { useEffect, useState } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import { unidadMedidasColumns } from "./unidadMedidasColumns";
import { unidadMedidasData } from "./unidadMedidasData";

import { onRowAdd } from "./onRowAdd";
import { onRowUpdate } from "./onRowUpdate";
import { onRowDelete } from "./onRowDelete";

import "../../../../../Styles/TableHeader.css";
import { HeaderTitle } from "../../../../lib/HeaderTitle"
import Imprimir from "../../Impresion/Imprimir/Imprimir";

export default function UnidadMedidas() {
  HeaderTitle("Unidad De Medidas")

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
  async function columnsFetch() {
    const col = await unidadMedidasColumns();
    setColumns(() => col);
  }

  async function dataFetch() {
    const data = await unidadMedidasData();
    setData(data);
  }

  async function initialFetch() {
    columnsFetch();
    dataFetch();
  }

  useEffect(() => {
    initialFetch();
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
        icons={tableIcons}
        localization={localization}
        columns={columns}
        data={data}
        options={{
          exportAllData: true,
          exportButton: true,
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData) => onRowAdd(newData).then(() => dataFetch()),
          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => dataFetch()),
          onRowDelete: (oldData) =>
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
