import React, { useEffect, useState } from "react";
import { stkGrupoLeerRedRubro } from "../Grupos/StkGrupoLeerRedRubro";

export default function columns() {
  const [columns, setColumns] = useState([]);

  async function stkgrupoleerredrubros() {
    const result = await stkGrupoLeerRedRubro();
    var obj = await result.reduce(function(acc, cur, i) {
      acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
      return acc;
    }, {});

    // setLookconst(obj);
    // console.log("setLookconst(obj) ", lookconst);

    // setLookconst(() => obj);
    // console.log("setLookconst(() => obj) ", lookconst);
    columnsFill(obj);
  }

  function columnsFill(probando) {
    setColumns(
      // {
      // ...rubro,
      // columns:
      [
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
          // lookup: lookconst,
          // lookup: probando,
          // native: true,
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
      ]
      // }
    );
  }
  useEffect(() => {
    stkgrupoleerredrubros();
  });
  return columns;
}
