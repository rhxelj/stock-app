import { leeStkRubro } from "./leeStkRubro";

export async function StkItems_Columns() {
  const stkRubros = await leeStkRubro(); //llamo a leer grupo
  var objstkrubro = await stkRubros.reduce(function (acc, cur) {
    acc[cur.StkRubroAbr] = cur.StkRubroDesc;
    return acc;
  }, {});
  return columnsFill(objstkrubro);
}

function columnsFill(objstkrubro) {
  console.log("está en StkItems_Columns ");
  return new Promise(function (resolve) {
    resolve([
      {
        title: "Items(ID)",
        field: "idStkItems",
        tipo: "numero",
        order: true,
      },
      {
        title: "Grupo",
        field: "StkItemsGrupo",
      },
      {
        title: "Rubro",
        field: "StkItemsRubro",
        tipo: "texto",
        order: true,
      },
      {
        title: "Rubro Abr",
        field: "StkItemsRubroAbr",
        lookup: objstkrubro,
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
        type: 'date',
        // dateSetting: { fromat: 'dd-mm-yyyy' },
        order: true,
        editable: "never",
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
    ]);
  });
}
// )
// }
