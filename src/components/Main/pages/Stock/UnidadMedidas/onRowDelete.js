// import { stkGrupoBorrar } from "./stkGrupoBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      {
        stkGrupoBorrar(oldData);
      }
      resolve();
    }, 1000);
  });
}
