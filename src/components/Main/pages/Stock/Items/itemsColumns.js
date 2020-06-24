import React, { useState, useEffect } from "react";
import request from "superagent";
import { leeStkGrupo } from "./leeStkGrupo";

import { stkrubroleecodgrupored } from "../Rubros/StkRubroLeeCodGrupoRed";

export async function itemsColumns() {
  const stkGrupos = await leeStkGrupo(); //llamo a leer grupo
  var objstkgrupo = await stkGrupos.reduce(function(acc, cur, i) {
    acc[cur.idStkGrupo] = cur.StkGrupoDesc;
    console.log("acc => ", acc);
    console.log("cur => ", cur);
    return acc;
  }, {});
  console.log("objstkgrupo => ");
  console.log(objstkgrupo);
  console.log("StkItemsGrupo =>");
  // console.log(StkItemsGrupo);
  return columnsFill(objstkgrupo);
}

// useEffect(() => {
//   console.log("estoy en useeffect de itemscolumns ");
//   console.log("props ");
//   console.log(rowData);
// }, [rowData]);

function columnsFill(objstkgrupo) {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        title: "Items(ID)",
        field: "idStkItems",
        tipo: "numero",
        order: true,
      },
      // {
      //   title: "Grupo",
      //   field: "StkRubroCodGrp",
      //   lookup: objstkgrupo,
      //   native: true,
      // },

      {
        title: "Grupo",
        // field: "StkGrupoDesc",
        field: "StkItemsGrupo",
        lookup: objstkgrupo, //TODO: Agregado ahora cambiar nombre
        // onRowDataChange: (props) => console.log(props),
        // tipo: "numero",
        // order: true,
        // editComponent: (props) => (
        //   <select  id="pet-select">
        //     <option value="">--Please choose an option--</option>
        //     <option value="dog">Dog</option>
        //     <option value="cat">Cat</option>
        //     <option value="hamster">Hamster</option>
        //     <option value="parrot">Parrot</option>
        //     <option value="spider">Spider</option>
        //     <option value="goldfish">Goldfish</option>
        //   </select>
        // ),
      },
      {
        title: "Rubro",
        field: "StkItemsRubro",
        tipo: "texto",
        order: true,
      },
      {
        title: "Descripción",
        field: "StkItemsDesc",
        tipo: "texto",
        order: true,
      },
      {
        title: "Cantidad",
        field: "StkItemsCantidad",
        tipo: "numero",
        order: true,
      },
      {
        title: "Cantidad Disponible",
        field: "StkItemsCantDisp",
        tipo: "numero",
        order: true,
      },
      {
        title: "Fecha de Actualización",
        field: "StkItemsFAct",
        tipo: "texto",
        order: true,
      },
      {
        title: "Stock Mínimo",
        field: "StkItemsMin",
        tipo: "numero",
        order: true,
      },
      {
        title: "Stock Máximo",
        field: "StkItemsMax",
        tipo: "numero",
        order: true,
      },
      // {
      //     title: "Observaciones",
      //     field: "StkItemsObserv",
      //     tipo:"numero"
      // },
    ]);
  });
  // resolve(columns);
}
// )
// }
