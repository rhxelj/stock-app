import { StkUbFisicaAgregar } from "./StkUbFisicaAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      StkUbFisicaAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
