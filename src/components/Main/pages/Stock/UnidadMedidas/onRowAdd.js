import { stkUnMedAgregar } from "./stkUnMedAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      // console.log(newData);
      stkUnMedAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
