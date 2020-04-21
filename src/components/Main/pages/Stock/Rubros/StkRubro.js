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

import MaterialTable, { Column } from "material-table";

// import StkRubroB from "./StkRubroB";
// import { toUnicode } from "punycode";
// import IpServidor from "../../VariablesDeEntorno";
// import request from "superagent";
// import Button from "@material-ui/core/Button";
// import StkRubroAgregar from "./StkRubroAgregar";
// import { lookup } from "dns";
// import { ClickAwayListener } from "@material-ui/core";
// import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// import { stkGrupoLeerRedRubro } from "./StkTableColumnsRubros";

export default function StkRubro() {
  // const [lookconst, setLookconst] = useState();

  const [nameError, setNameError] = useState({
    error: false,
    label: "",
    helperText: "",
  });

  const [rubro, setRubro] = useState({ columns: [], data: [] });

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // Lleno columna - inicio
  async function stkgrupoleerredrubros() {
    const stkgrupo = await stkGrupoLeerRedRubro();
    var objstkgrupo = await stkgrupo.reduce(function(acc, cur, i) {
      acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
      return acc;
    }, {});

    const stkrubro = await stkrubroleeproveedor();
    var objstkrubroprov = await stkrubro.reduce(function(acc, cur, i) {
      acc[cur.StkRubroProv] = cur.ProveedoresDesc;
      return acc;
    }, {});

    const stkUnMed = await stkUnMedLeerRed();
    var objstkUnMed = await stkUnMed.reduce(function(acc, cur, i) {
      acc[cur.idStkUnMed] = cur.StkUnMedDesc;
      return acc;
    }, {});

    const stkMonedas = await stkMonedasleerRed();
    var objstkMonedas = await stkMonedas.reduce(function(acc, cur, i) {
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
    stkgrupoleerredrubros();
    stkrubroleemezcla();
  }

  function columnsFill(
    objstkgrupo,
    objstkrubroprov,
    objstkUnMed,
    objstkMonedas
  ) {
    setColumns([
      // {
      //   title: "Rubro(ID)",
      //   field: "idStkRubro"
      // },
      {
        title: "Descripción",
        field: "StkRubroDesc",
      },
      {
        title: "Grupo",
        field: "StkRubroCodGrp",
        lookup: objstkgrupo,
        native: true,
      },
      {
        title: "Abreviatura",
        field: "StkRubroAbr",
        // editComponent: (props) => <input maxlength="4" />,
      },
      {
        title: "Proveedor",
        // field: "ProveedoresDesc",
        field: "StkRubroProv",

        lookup: objstkrubroprov,
        native: true,
      },
      {
        title: "Ancho",
        field: "StkRubroAncho",
        emptyValue: "false",
        type: "numeric",
        // editComponent: (props) => (
        //   <input type="number" value={props.StkRubroAncho} />
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
        lookup: objstkUnMed,
      },
      {
        title: "Costo",
        field: "StkRubroCosto",
        type: "currency",
        // editComponent: (props) => (
        //   <input type="number" value={props.StkRubroCosto} />
        // ),
      },
      {
        title: "Moneda",
        field: "StkRubroTM",
        lookup: objstkMonedas,
      },
    ]);
  }

  function onRowadd(newData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        {
          agregarRubros(newData).then(() => stkrubroleemezcla());
        }
        resolve();
      }, 600);
    });
  }

  useEffect(() => {
    initialFetch();
    // stkrubroleemezcla();
  }, []);

  return (
    <div>
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
        }}
        editable={{
          onRowAdd: (newData) => onRowadd(newData),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (newData.StkRubroDesc === "") {
                  setNameError({
                    error: true,
                    label: "required",
                    helperText: "Required helper text",
                  });
                  reject();
                  return;
                }
                resolve();
                if (oldData) {
                  setRubro((prevRubro) => {
                    const data = [...prevRubro.data];
                    data[data.indexOf(oldData)] = newData;
                    console.log(newData);
                    return { ...prevRubro, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setRubro((prevRubro) => {
                  const data = [...prevRubro.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevRubro, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}
