export function grupoColumns() {
  return new Promise(function (resolve) {
    resolve([
      {
        title: "Grupo(ID)",
        field: "idStkGrupo",
        editable: "never",
        order: true,
      },
      {
        title: "Descripcion",
        field: "StkGrupoDesc",
        order: true,
      },
      {
        title: "Abreviatura",
        field: "StkGrupoAbr",
        order: true,
      },
      // {
      //   title: "Contador de Rubro",
      //   field: "StkGrupoContRubro",
      //   editable: "never",
      //   order: true,
      // },
    ]);
  });
}
