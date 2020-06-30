// Importo stkitems agregar o el backend que agrega items.
// import { stkProveedoresAgregar } from "./ProveedoresAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        // stkProveedoresAgregar(newData);
        console.log("Estoy en Row add ");
      }
      resolve();
    }, 1000);
  });
}
//TODO modificar este componente...
