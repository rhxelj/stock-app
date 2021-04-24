import { ProveedoresBorrar } from "./ProveedoresBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      ProveedoresBorrar(oldData);
      // }
      resolve();
    }, 1000);
  });
}
