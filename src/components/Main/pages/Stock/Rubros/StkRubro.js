import React, { useEffect, useState } from "react";
import { stkGrupoLeerRedRubro } from "../Grupos/StkGrupoLeerRedRubro";
import StkRubroB from "./StkRubroB";
import { toUnicode } from "punycode";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import MaterialTable, { Column } from "material-table";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
import Button from "@material-ui/core/Button";
import StkRubroAgregar from "./StkRubroAgregar";
import { lookup } from "dns";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";
import { stkgrupoleerredrubro } from "../Grupos/StkGrupoLeerRedRubro";
import { ClickAwayListener } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

// import { columns } from "./StkTableColumnsRubros";

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

  async function stkgrupoleerredrubros() {
    const result = await stkGrupoLeerRedRubro();
    var obj = await result.reduce(function(acc, cur, i) {
      acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
      return acc;
    }, {});
    columnsFill(obj);
  }

  async function stkrubroleemezcla() {
    const result = await stkrubroleermezcla();
    setData(() => result);
  }

  async function initialFetch() {
    stkgrupoleerredrubros();
    stkrubroleemezcla();
  }

  function columnsFill(lookup) {
    setColumns([
      {
        title: "Rubro(ID)",
        field: "idStkRubro",
      },
      {
        title: "Descripción",
        field: "StkRubroDesc",
      },
      {
        title: "Grupo",
        field: "StkRubroCodGrp",
        lookup: lookup,
        native: true,
      },
      {
        title: "Abreviatura",
        field: "StkRubroAbr",
      },
      {
        title: "Proveedor",
        field: "ProveedoresDesc",
      },
      {
        title: "Ancho",
        field: "StkRubroAncho",
        emptyValue: "false",
        // required : true,
        //    type : 'currency'
      },
      {
        title: "Presentación",
        field: "StkRubroPresDes",
      },
      {
        title: "Presentacion",
        field: "StkRubroPres",
      },
      {
        title: "Unidad De Medida",
        field: "StkRubroUM",
      },
      {
        title: "Costo",
        field: "StkRubroCosto",
      },
      {
        title: "Moneda",
        field: "StkRubroTM",
      },
    ]);
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
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setRubro((prevRubro) => {
                  const data = [...prevRubro.data];
                  console.log(newData);
                  data.push(newData);
                  return { ...prevRubro, data };
                });
              }, 600);
            }),

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
