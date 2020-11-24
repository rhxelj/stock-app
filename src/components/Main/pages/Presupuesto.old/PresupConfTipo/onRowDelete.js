import { presupConfTipoBorrar } from "./presupConfTipoBorrar";

export function onRowDelete(oldData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            presupConfTipoBorrar(oldData);
            resolve();
        }, 1000);
    });
}
