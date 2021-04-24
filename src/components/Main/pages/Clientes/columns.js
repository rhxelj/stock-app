// import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoProv } from "./LeeTipoClien";

export async function llenarColumns() {
  const tipoprov = await leeTipoProv();
  var objstktipoprov = await tipoprov.reduce(function (acc, cur) {
    acc[cur.idSubRubro] = cur.SubRubroDetalle;
    // return acc;
    return Object.values(acc).sort(function (a, b) {
      return acc[a] - acc[b];
    });
  }, {});

  // const stkMonedas = await stkMonedasleerRed();
  // var objstkMonedas = await stkMonedas.reduce(function (acc, cur, i) {
  //   acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
  //   return acc;
  // }, {});

  return columnsFill(objstktipoprov);
  //, objstkMonedas);
}

function columnsFill(objstktipoprov) {
  return new Promise(function (resolve) {
    resolve([
      // { title: "idProveedores", field: "idProveedores" },
      // { title: "Tipo", field: "ProveedoresTipo" }, //Proveedores Tipo idStkTipoProveed
      { title: "Descripción", field: "ClientesDesc" },
      { title: "Calle", field: "ClientesCalle", defaultValue: "" },
      { title: "Calle Nro.", field: "ClientesNroCalle", defaultValue: 0 },
      { title: "Piso", field: "ClientesPiso", defaultValue: "" },
      { title: "Dto", field: "ClientesDto", defaultValue: "" },
      { title: "CodPos", field: "ClientesCodPos", defaultValue: "" },
      { title: "Loc", field: "ClientesLoc", defaultValue: "" },
      { title: "Pcia", field: "ClientesPcia", defaultValue: "" },
      { title: "Tel-WA", field: "ClientesTel", defaultValue: "" },
      { title: "Mail", field: "ClientesMail", defaultValue: "" },
      { title: "CUIT", field: "ClientesCUIT", defaultValue: "" },
      { title: "Tipo", field: "ClientesTipo", lookup: objstktipoprov },
    ]);
  });
}
