import React, { useState, useEffect } from "react";

import "../../../../../Styles/TableHeader.css";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { HeaderTitle } from "../../../../lib/HeaderTitle"
import ruLocale from 'date-fns/locale/ru';

import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { leeStkItemsDetalles } from "./leeStkitemsDetalles"
import { StkItems_Columns } from "./StkItems_Columns";
import { StkItems_ColumnsI } from "./StkItems_ColumnsI";
import Imprimir from "../../Impresion/Imprimir/Imprimir";

export default function StkItems() {
  HeaderTitle("ITEMS")

  const [columns, setColumns] = useState([]);

  const [columnsi, setColumnsI] = useState([]);
  const [data, setData] = useState([]);
  const [datai, setDataI] = useState([]);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

  async function columnsFetch() {
    const col = await StkItems_Columns();
    setColumns(() => col);
  }

  async function columnsFetchI() {
    const col = await StkItems_ColumnsI();
    setColumnsI(() => col);
  }
  async function dataFetch() {
    const data = await leeStkItemsDetalles();
    setData(data);
    setDataI(data);
  }


  async function initialFetch() {
    columnsFetch()
    columnsFetchI()
    dataFetch()
  }

  useEffect(() => {
    initialFetch();
  }, []);


  return (
    <div>
      {console.log(data)}
      <MaterialTable
        title=""
        actions={[
          {
            icon: () => <tableIcons.Print />,
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: (event) => setImprimirTF({ imprimir: true }),
          },
        ]}
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
      <Imprimir
        columns={columnsi}
        datos={datai}
        open={imprimirTF.imprimir}
        setOpen={setImprimirTF}
      />
    </div>
  );
}
