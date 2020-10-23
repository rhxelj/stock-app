// Importo stkitems agregar o el backend que agrega items.
import { stkItemsBuscaCod } from "./StkItemsBuscaCod";
export function onRowAdd(newData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // {
      stkItemsBuscaCod(newData);
      // }
      resolve();
    }, 1000);
  });
}
//TODO modificar este componente...
