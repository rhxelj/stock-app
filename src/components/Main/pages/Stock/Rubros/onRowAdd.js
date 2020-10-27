import { agregarRubros } from "./StkRubroAgregar";

export function onRowAdd(newData) {
  console.log('newData  ', newData)

  return new Promise((resolve) => {
    setTimeout(() => {
      agregarRubros(newData);
      resolve();
    }, 600);
  });
}
