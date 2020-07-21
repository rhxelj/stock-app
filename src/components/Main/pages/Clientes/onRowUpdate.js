import { ClientesModificar } from "./ClientesModificar";

export function onRowUpdate(newData, oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        ClientesModificar(newData);
      }
      resolve();
    }, 1000);
  });
}
