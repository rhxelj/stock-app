import { stkGrupoBorrar } from "./stkGrupoBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      stkGrupoBorrar(oldData);
      // }
      resolve();
    }, 1000);
  });
}
