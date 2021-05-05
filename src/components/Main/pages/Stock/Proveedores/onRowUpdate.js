import { ProveedoresModificar } from "./ProveedoresModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      ProveedoresModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
