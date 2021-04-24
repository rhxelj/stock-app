import { modificarItems } from "./StkItemsModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      modificarItems(newData);
      // }
      resolve();
    }, 600);
  });
}
