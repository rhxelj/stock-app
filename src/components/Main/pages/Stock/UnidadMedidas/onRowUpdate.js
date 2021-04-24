import { stkUnMedModificar } from "./stkUnMedModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      stkUnMedModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
