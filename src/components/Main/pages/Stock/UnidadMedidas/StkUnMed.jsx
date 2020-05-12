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

export default function UnidadMedidas() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

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
        icons={tableIcons}
        localization={localization}
        columns={columns}
        data={data}
        options={{
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
    </div>
  );
}
