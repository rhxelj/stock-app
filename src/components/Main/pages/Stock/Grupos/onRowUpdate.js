import { stkGrupoModificar } from "./stkGrupoModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      stkGrupoModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
