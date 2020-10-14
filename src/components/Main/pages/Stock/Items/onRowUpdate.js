import { modificarItems } from "./StkItemsModificar";

export function onRowUpdate(newData, oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      modificarItems(newData);
      // }
      resolve();
    }, 600);
  });
}
