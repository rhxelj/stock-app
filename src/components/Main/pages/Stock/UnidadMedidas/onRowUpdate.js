import { stkUnMedModificar } from "./stkUnMedModificar";

export function onRowUpdate(newData, oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        stkUnMedModificar(newData);
      }
      resolve();
    }, 1000);
  });
}
