export function unidadMedidasColumns() {
  return new Promise(function(resolve, reject) {
    resolve([
      {
        title: "Código",
        field: "idStkUnMed",
        // tipo:"texto",
        order: true,
      },
      {
        title: "Descripción",
        field: "StkUnMedDesc",
        // tipo:"texto",
        order: true,
      },
      {
        title: "",
        field: "borrar",
        // tipo:"",
        order: false,
      },
    ]);
  });
}
