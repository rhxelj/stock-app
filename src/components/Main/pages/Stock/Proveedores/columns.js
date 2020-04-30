import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoProv } from "./LeeTipoProv";

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

  const tipoprov = await leeTipoProv();
  console.log("Tipo Prov => ", tipoprov);
  var objstktipoprov = await tipoprov.reduce(function(acc, cur, i) {
    acc[cur.idSubRubro] = cur.SubRubroDetalle;
    return acc;
  }, {});

  const stkMonedas = await stkMonedasleerRed();
  var objstkMonedas = await stkMonedas.reduce(function(acc, cur, i) {
    acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
    return acc;
  }, {});

  return columnsFill(objstktipoprov, objstkMonedas);
  // objstkgrupo, objstkrubroprov, objstkUnMed, objstkMonedas
}

function columnsFill(objstktipoprov, objstkMonedas) {
  // objstkgrupo,
  // objstkrubroprov,
  // objstkUnMed,

  return new Promise(function(resolve, reject) {
    // setColumns(

    resolve([
      // { title: "idProveedores", field: "idProveedores" },
      { title: "Descripción", field: "ProveedoresDesc" },
      // { title: "Tipo", field: "ProveedoresTipo" }, //Proveedores Tipo idStkTipoProveed
      { title: "Tipo", field: "ProveedoresTipo", lookup: objstktipoprov },
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
      {
        title: "CodMon",
        field: "ProveedoresCodMon",
        lookup: objstkMonedas,
      },
    ]);
  });
}
