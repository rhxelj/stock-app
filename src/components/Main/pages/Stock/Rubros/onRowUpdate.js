import { modificarRubros } from "./StkRubroModificar";

export function onRowUpdate(newData, oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      modificarRubros(newData);
      // }
      resolve();
    }, 600);
  });
}
