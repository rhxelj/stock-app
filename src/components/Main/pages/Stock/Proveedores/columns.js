import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";

export async function llenarColumns() {
  // const stkgrupo = await stkGrupoLeerRedRubro();
  // var objstkgrupo = await stkgrupo.reduce(function (acc, cur, i) {
  //   acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
  //   return acc;
  // }, {});

  // const stkrubro = await stkrubroleeproveedor();
  // var objstkrubroprov = await stkrubro.reduce(function (acc, cur, i) {
  //   acc[cur.StkRubroProv] = cur.ProveedoresDesc;
  //   return acc;
  // }, {});

  // const stkUnMed = await stkUnMedLeerRed();
  // var objstkUnMed = await stkUnMed.reduce(function (acc, cur, i) {
  //   acc[cur.idStkUnMed] = cur.StkUnMedDesc;
  //   return acc;
  // }, {});

  const stkMonedas = await stkMonedasleerRed();
  var objstkMonedas = await stkMonedas.reduce(function(acc, cur, i) {
    acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
    return acc;
  }, {});

  return columnsFill(objstkMonedas);
  // objstkgrupo, objstkrubroprov, objstkUnMed, objstkMonedas
}
// Lleno columna - fin{idStkMonedas: "qaz", StkMonedasDescripcion: "DES1700"}
// async function stkrubroleemezcla() {
//   const result = await stkrubroleermezcla();
//   setData(() => result);
//   console.log("data => ", data);
// }

// async function initialFetch() {
//   const col = await llenarColumns();
//   console.log("el contenido de col es  : ", col)
//   setColumns(() => col)
//   dataFetch();
// }

function columnsFill(objstkMonedas) {
  // objstkgrupo,
  // objstkrubroprov,
  // objstkUnMed,

  return new Promise(function(resolve, reject) {
    // setColumns(

    resolve([
      // { title: "idProveedores", field: "idProveedores" },
      { title: "Descripción", field: "ProveedoresDesc" },
      { title: "Tipo", field: "ProveedoresTipo" }, //Proveedores Tipo idStkTipoProveed
      { title: "Calle", field: "ProveedoresCalle" },
      { title: "CUIT", field: "ProveedoresCUIT" },
      { title: "Calle Nro.", field: "ProveedoresNroCalle" },
      { title: "Piso", field: "ProveedoresPiso" },
      { title: "Dto", field: "ProveedoresDto" },
      { title: "CodPos", field: "ProveedoresCodPos" },
      { title: "Loc", field: "ProveedoresLoc" },
      { title: "Pcia", field: "ProveedoresPcia" },
      { title: "Tel", field: "ProveedoresTel" },
      { title: "Contacto", field: "ProveedoresContacto" },
      { title: "Mail", field: "ProveedoresMail" },
      { title: "Web", field: "ProveedoresWeb" },
      // { title: "CodMon", field: "ProveedoresCodMon" },
      {
        title: "CodMon",
        field: "ProveedoresCodMon",
        lookup: objstkMonedas,
      },
    ]);
  });
}
