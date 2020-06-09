export function itemsColumns() {
  return new Promise(function(resolve, reject) {
    // async function columns() {

    // const stkMonedas = await stkMonedasleerRed();
    //   var objstkMonedas = await stkMonedas.reduce(function(acc, cur, i) {
    //     acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
    //     return acc;
    //   }, {});

    // export const columns = [
    const columns = [
      {
        title: "Items(ID)",
        field: "idStkItems",
        tipo: "numero",
        order: true,
      },
      {
        title: "Grupo",
        field: "StkGrupoDesc",
        tipo: "numero",
        order: true,
      },
      {
        title: "Rubro",
        field: "StkRubroDesc",
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
    ];
    resolve(columns);
  });
}
