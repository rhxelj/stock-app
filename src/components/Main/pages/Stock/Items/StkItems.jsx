import React, { useState, useEffect } from "react";

import "../../../../../Styles/TableHeader.css";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { HeaderTitle } from "../../../../lib/HeaderTitle"


import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { leeStkItemsDetalles } from "./leeStkitemsDetalles"
import { StkItems_Columns } from "./StkItems_Columns";

export default function StkItems() {
  HeaderTitle("ITEMS")

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  async function columnsFetch() {
    const col = await StkItems_Columns();
    setColumns(() => col);
  }

  async function dataFetch() {
    const data = await leeStkItemsDetalles();
    setData(data);
  }


  async function initialFetch() {
    columnsFetch()
    dataFetch()
  }

  useEffect(() => {
    initialFetch();
  }, []);


  return (
    <div>
      <MaterialTable
        localization={localization}
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
        }}

        editable={{
          onRowAdd: newData =>
            onRowAdd(newData).then(() => setTimeout(() => { dataFetch() }, 5000)),

          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => dataFetch()),
          onRowDelete: oldData =>
            onRowDelete(oldData).then(() => dataFetch()),
        }}

      />
    </div>
  );
}
