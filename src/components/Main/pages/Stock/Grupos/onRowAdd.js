import { stkGrupoAgregar } from "./stkGrupoAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      stkGrupoAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
