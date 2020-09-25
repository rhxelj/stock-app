import React, { useEffect, useState } from "react";

import { StkRubro_Columns } from "./StkRubro_Columns";

import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";

import { onRowAdd } from "./onRowAdd";
import { onRowUpdate } from "./onRowUpdate";
import { onRowDelete } from "./onRowDelete";
import MaterialTable, { Column } from "material-table";
import { HeaderTitle } from "../../../../lib/HeaderTitle";
import Imprimir from "../../Impresion/Imprimir/Imprimir";
export default function StkRubro() {
  // const [lookconst, setLookconst] = useState();
  HeaderTitle("RUBROS"); //titulo a mostrar en el navbar

  const [nameError, setNameError] = useState({
    error: false,
    label: "",
    helperText: "",
  });

  const [rubro, setRubro] = useState({ columns: [], data: [] });
  const [strubromodificar, setStkrubromodificar] = useState(false);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  async function columnsFetch() {
    const col = await StkRubro_Columns();
    setColumns(() => col);
  }
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
  async function dataFetch() {
    const result = await stkrubroleermezcla();
    setData(() => result);
  }

  async function initialFetch() {
    columnsFetch(); //lleno columns con los datos obtenidos
    dataFetch(); //Lleno data
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
        icons={tableIcons}
        title=""
        columns={columns}
        data={data}
        localization={localization}
        options={{
          exportAllData: true,
          exportButton: true,
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          // tableLayout: "fixed",
        }}
        // components={{
        //   EditRow: (props) => console.log("Props : ", props),
        //   // <StkRubroModificar open={true} />,
        // }}
        editable={{
          onRowAdd: (newData) =>
            onRowAdd(newData).then(
              setTimeout(() => {
                {
                  initialFetch();
                }
              }, 5000)
            ),

          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => initialFetch()),

          onRowDelete: (oldData) =>
            onRowDelete(oldData).then(
              setTimeout(() => {
                {
                  initialFetch();
                }
              }, 5000)
            ),
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
