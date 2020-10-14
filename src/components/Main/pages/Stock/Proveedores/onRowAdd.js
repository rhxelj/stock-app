import { stkProveedoresAgregar } from "./ProveedoresAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      stkProveedoresAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
