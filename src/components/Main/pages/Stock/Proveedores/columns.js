import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";

export function leercolumns(props) {
  return new Promise(function(resolve, reject) {
    var columns = [];

    // Lleno columna - inicio

    async function leerMonedas() {
      const stkMonedas = await stkMonedasleerRed();
      var objstkMonedas = await stkMonedas.reduce(function(acc, cur, i) {
        acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
        return acc;
      }, {});

      // columnsFill(objstkMonedas);
    }

    // function columnsFill(objstkMonedas) {
    columns = [
      // { title: "idProveedores", field: "idProveedores" },
      { title: "Descripción", field: "proveedor.ProveedoresDesc" },
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
      { title: "CodMon", field: "ProveedoresCodMon" },
      // {
      //   title: "CodMon",
      //   field: "ProveedoresCodMon",
      //   lookup: objstkMonedas,
      // },
    ];
    console.log("dentro de columnsFill columns => ", columns);
    // }
    // leerMonedas();

    resolve(columns);
  });
}
