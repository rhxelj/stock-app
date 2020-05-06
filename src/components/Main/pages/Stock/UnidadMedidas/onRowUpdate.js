// import { stkGrupoModificar } from "./stkGrupoModificar";

export function onRowUpdate(newData, oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        stkGrupoModificar(newData);
      }
      resolve();
    }, 1000);
  });
}
