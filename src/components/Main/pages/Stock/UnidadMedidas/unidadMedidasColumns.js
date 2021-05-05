export function unidadMedidasColumns() {
  return new Promise(function (resolve) {
    resolve([
      {
        title: "Código",
        field: "idStkUnMed",
        // tipo:"texto",
        editable: "onAdd",
      },
      {
        title: "Descripción",
        field: "StkUnMedDesc",
        // tipo:"texto",
      },
    ]);
  });
}
