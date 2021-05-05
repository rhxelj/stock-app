import { presupConfTipoBorrar } from "./presupConfTipoBorrar";

export function onRowDelete(oldData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            presupConfTipoBorrar(oldData);
            resolve();
        }, 1000);
    });
}
