import { StkUbFisicaBorrar } from "./StkUbFisicaBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      StkUbFisicaBorrar(oldData);
      // }
      resolve();
    }, 1000);
  });
}
