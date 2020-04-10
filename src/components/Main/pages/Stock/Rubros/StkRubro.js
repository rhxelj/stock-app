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

export default function StkRubro() {
  const [lookconst, setLookconst] = useState();

  const [nameError, setNameError] = useState({
    error: false,
    label: "",
    helperText: "",
  });

  const [rubro, setRubro] = useState({ columns: [], data: [] });

  // ***********************************************

  async function stkgrupoleerredrubros() {
    const result = await stkGrupoLeerRedRubro();
    var obj = await result.reduce(function(acc, cur, i) {
      acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
      return acc;
    }, {});
    setLookconst(obj);
  }

  async function stkrubroleemezcla() {
    const result = await stkrubroleermezcla();
    setRubro({ ...rubro, data: result });
  }

  async function initialFetch() {
    await stkgrupoleerredrubros();
    console.log("ya setie loockconst");
  }

  // ***********************************************

  useEffect(() => {
    initialFetch();
    // stkrubroleemezcla();
    console.log("1");
    console.log("estoy en initial fetch ");
    console.log("Rubro ", rubro);
    console.log("1");
  }, []);

  useEffect(() => {
    stkrubroleemezcla();
    console.log("2");
    console.log("Rubro en useeffect cuando cambia rubro : ", rubro);
    console.log("2");
  }, [rubro.columns]);

  useEffect(() => {
    setRubro({
      // ...rubro,
      columns: [
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
          lookup: lookconst,
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
      ],

      data: [],
    });
    console.log("3");
    console.log("estoy en initial useeffect lookconst ");
    console.log("Rubro ", rubro);
    console.log("3");
  }, [lookconst]);

  ////////

  // useEffect(() => {
  //   stkrubroleemezcla();
  // }, []);

  // useEffect(() => {}, [rubro.data]);

  //////////////

  return (
    <div>
      {/* {lookconst && <StkRubroB lookconst={lookconst}></StkRubroB>} */}
      <MaterialTable
        icons={tableIcons}
        title="Tabla Rubros"
        columns={rubro.columns}
        // columns={columns}
        data={rubro.data}
        localization={localization}
        //   Add : 'ii'
        // }}
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
