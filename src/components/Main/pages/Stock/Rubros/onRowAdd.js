import { agregarRubros } from "./StkRubroAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      {
        console.log('onRowAdd antes de agregar ')
        agregarRubros(newData);
        console.log('onRowAdd despues de agregar ')
      }
      resolve();
    }, 600);
  });
}
