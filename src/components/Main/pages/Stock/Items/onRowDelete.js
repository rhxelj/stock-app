import { borrarItems } from "./StkItemsBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      borrarItems(oldData);
    }, 600);
    resolve();
  });
}
