import React, { useEffect, useState } from "react";

// import { stkGrupoLeerRedRubro } from "../Grupos/StkGrupoLeerRedRubro";
// import { stkrubroleeproveedor } from "./StkRubroLeeProveedor";

// import { stkUnMedLeerRed } from "./StkUnMedLeerRed";
// import { stkMonedasleerRed } from "./StkMonedasLeerRed";
import { buscaCodigo } from "./BuscaCodigo";

import { StkRubro_Columns } from "./StkRubro_Columns";

import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";

import { agregarRubros } from "./StkRubroAgregar";
import { borrarRubros } from "./StkRubroBorrar";
import { modificarRubros } from "./StkRubroModificar";

import MaterialTable, { Column } from "material-table";
import { HeaderTitle } from "../../../../lib/HeaderTitle";

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

  async function dataFetch() {
    const result = await stkrubroleermezcla();
    setData(() => result);
  }

  async function initialFetch() {
    columnsFetch(); //lleno columns con los datos obtenidos
    dataFetch(); //Lleno data
  }

  // revisado -------

  useEffect(() => {
    initialFetch();
  }, []);

  function onRowadd(newData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        {
          agregarRubros(newData).then(() => dataFetch());
        }
        resolve();
      }, 600);
    });
  }

  function onRowUpdate(newData, oldData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        modificarRubros(newData).then(() => dataFetch());
        resolve();
      }, 600);
    });
  }

  function onRowDelete(oldData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        borrarRubros(oldData).then(() => dataFetch());
      }, 600);
      resolve();
    });
  }

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title=""
        columns={columns}
        data={data}
        localization={localization}
        options={{
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
          onRowAdd: (newData) => onRowadd(newData),

          onRowUpdate: (newData, oldData) => onRowUpdate(newData, oldData),

          onRowDelete: (oldData) => onRowDelete(oldData),
        }}
      />
    </div>
  );
}
