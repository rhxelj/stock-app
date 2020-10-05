import { ProveedoresModificar } from "./ProveedoresModificar";

export function onRowUpdate(newData, oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      ProveedoresModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
