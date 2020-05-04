import { ProveedoresBorrar } from "./ProveedoresBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        ProveedoresBorrar(oldData);
      }
      resolve();
    }, 1000);
  });
}
