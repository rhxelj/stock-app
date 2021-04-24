import { StkUbFisicaAgregar } from "./StkUbFisicaAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      StkUbFisicaAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
