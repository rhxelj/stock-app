import { ClientesAgregar } from "./ClientesAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        ClientesAgregar(newData);
      }
      resolve();
    }, 1000);
  });
}
