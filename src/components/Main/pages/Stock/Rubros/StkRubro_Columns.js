import React from "react";
import { stkGrupoLeerRedRubro } from "../Grupos/StkGrupoLeerRedRubro";
import { stkrubroleeproveedor } from "./StkRubroLeeProveedor";
import { stkUnMedLeerRed } from "./StkUnMedLeerRed";
import { stkMonedasleerRed } from "./StkMonedasLeerRed";

export async function StkRubro_Columns() {
  const stkgrupo = await stkGrupoLeerRedRubro();
  console.log("stkgrupo .... ");
  console.log(stkgrupo);
  var objstkgrupo = await stkgrupo.reduce(function (acc, cur) {
    acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
    return acc;
  }, {});
  console.log(objstkgrupo);
  const stkrubro = await stkrubroleeproveedor();
  var objstkrubroprov = await stkrubro.reduceRight(function (acc, cur, i) {
    acc[cur.StkRubroProv] = cur.ProveedoresDesc;
    return acc;
    // return Object.values(acc).sort();
  }, {});

  const stkUnMed = await stkUnMedLeerRed();
  var objstkUnMed = await stkUnMed.reduce(function (acc, cur, i) {
    acc[cur.idStkUnMed] = cur.StkUnMedDesc;
    return acc;
    // return Object.values(acc).sort();
  }, {});

  const stkMonedas = await stkMonedasleerRed();
  var objstkMonedas = await stkMonedas.reduce(function (acc, cur, i) {
    acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
    return acc;
    // return Object.values(acc).sort();
  }, {});

  return columnsFill(objstkgrupo, objstkrubroprov, objstkUnMed, objstkMonedas);
}

function columnsFill(objstkgrupo, objstkrubroprov, objstkUnMed, objstkMonedas) {
  return new Promise(function (resolve, reject) {
    resolve([
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
        defaultSort: "asc",
        sorting: true,
        native: true,
      },
      {
        title: "Abreviatura",
        field: "StkRubroAbr",
        editComponent: (props) => (
          <input
            maxlength="5"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
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
        initialEditValue: "0",
        editComponent: (props) => (
          <input
            // type="number"
            // value={props.StkRubroAncho}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
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
      {
        title: "Fecha",
        field: "StkRubroFecha",
        type: "date",
        order: true,
        editable: false,
      },
    ]);
  });
}
