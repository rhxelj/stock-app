// Importo stkitems agregar o el backend que agrega items.
import { stkItemsAgregar } from './StkItemsAgregar'
import { stkItemsBuscaCod } from './StkItemsBuscaCod'
export function onRowAdd(newData) {

  return new Promise((resolve, reject) => {
    console.log('newData  ', newData)
    setTimeout(() => {
      {
        stkItemsBuscaCod(newData)
      }
      resolve();
    }, 1000);
  });
}
//TODO modificar este componente...
