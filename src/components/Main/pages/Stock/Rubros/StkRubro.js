import React, { useEffect, useState } from "react";
import { stkGrupoLeerRedRubro } from "../Grupos/StkGrupoLeerRedRubro";

import { stkrubroleeproveedor } from "./StkRubroLeeProveedor";
import { stkUnMedLeerRed } from "./StkUnMedLeerRed";
import { stkMonedasleerRed } from "./StkMonedasLeerRed";
import { buscaCodigo } from "./BuscaCodigo";

import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";

import { agregarRubros } from "./StkRubroAgregar";
import { borrarRubros } from "./StkRubroBorrar";
import { modificarRubros } from "./StkRubroModificar";

import MaterialTable, { Column } from "material-table";
import { HeaderTitle } from "../../../../lib/HeaderTitle";
import StkGrupo from "../Grupos/StkGrupo";

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

  // Lleno columna - inicio
  async function stkgrupoleerredrubros() {
    const stkgrupo = await stkGrupoLeerRedRubro();
    var objstkgrupo = await stkgrupo.reduce(function (acc, cur, i) {
      acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
      return acc;
    }, {});

    const stkrubro = await stkrubroleeproveedor();
    var objstkrubroprov = await stkrubro.reduce(function (acc, cur, i) {
      acc[cur.StkRubroProv] = cur.ProveedoresDesc;
      return acc;
    }, {});

    const stkUnMed = await stkUnMedLeerRed();
    var objstkUnMed = await stkUnMed.reduce(function (acc, cur, i) {
      acc[cur.idStkUnMed] = cur.StkUnMedDesc;
      return acc;
    }, {});

    const stkMonedas = await stkMonedasleerRed();
    var objstkMonedas = await stkMonedas.reduce(function (acc, cur, i) {
      acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
      return acc;
    }, {});

    columnsFill(objstkgrupo, objstkrubroprov, objstkUnMed, objstkMonedas);
  }
  // Lleno columna - fin{idStkMonedas: "qaz", StkMonedasDescripcion: "DES1700"}
  async function stkrubroleemezcla() {
    const result = await stkrubroleermezcla();
    setData(() => result);
  }

  async function initialFetch() {
    stkgrupoleerredrubros(); //lleno columns con los datos obtenidos
    stkrubroleemezcla(); //Lleno data
  }
  function columnsFill(
    objstkgrupo,
    objstkrubroprov,
    objstkUnMed,
    objstkMonedas
  ) {
    setColumns([
      {
        title: "Descripción",
        field: "StkRubroDesc",
      },
      {

        id: 1,
        title: "Grupo",
        field: "StkRubroCodGrp",
        lookup: objstkgrupo,
        native: true,
      },
      {
        title: "Abreviatura",
        field: "StkRubroAbr",
        editComponent: (props) => (
          < input
            maxlength="4"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)
            }
          />
        ),
      },
      {
        title: "Proveedor",
        // field: "ProveedoresDesc",
        field: "StkRubroProv",
        defaultValue: 0,
        lookup: objstkrubroprov,
        native: true,
      },
      {
        title: "Ancho",
        field: "StkRubroAncho",
        // emptyValue: "false",

        type: "numeric",
        initialEditValue: "0",
        // editComponent: (props) => (
        //   // <input
        //   //   // type="number"
        //   //   // value={props.StkRubroAncho}
        //   //   value={props.value}
        //   //   onChange={(e) => props.onChange(e.target.value)}
        //   // />
        // ),
        // required : true,
        //    type : 'currency'
      },
      {
        title: "Pres. Descripción",
        field: "StkRubroPresDes",
      },
      {
        title: "Presentacion",
        field: "StkRubroPres",
        type: "numeric",
        // editComponent: (props) => (
        //   <input type="number" value={props.StkRubroPres} />
        // ),
      },
      {
        title: "Unidad De Medida",
        field: "StkRubroUM",
        show: false,
        lookup: objstkUnMed,
      },
      {
        title: "Costo",
        field: "StkRubroCosto",
        type: "currency",
        editComponent: (props) => (
          <input
            type="number"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
      },
      {
        title: "Moneda",
        field: "StkRubroTM",
        lookup: objstkMonedas,
      },
    ]);

  }

  useEffect(() => {
    initialFetch();
    // stkrubroleemezcla();
  }, []);

  function onRowadd(newData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        {
          console.log('new DAta  ', newData.StkRubroCodGrp)
          agregarRubros(newData).then(() => stkrubroleemezcla());
        }
        resolve();
      }, 600);
    });
  }

  function onRowUpdate(newData, oldData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        modificarRubros(newData).then(() => stkrubroleemezcla());
        resolve();
      }, 600);
    });
  }

  function onRowDelete(oldData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        borrarRubros(oldData).then(() => stkrubroleemezcla());
      }, 600);
      resolve();
    });
  }

  return (
    <div>
      {console.log('esta aca  ', columns)}
      <MaterialTable
        icons={tableIcons}
        title="Tabla Rubros"
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
