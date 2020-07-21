import { ClientesBorrar } from "./ClientesBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        ClientesBorrar(oldData);
      }
      resolve();
    }, 1000);
  });
}
