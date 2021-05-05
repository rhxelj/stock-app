import { presupConfTipoAgregar } from "./presupConfTipoAgregar";

export function onRowAdd(newData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            presupConfTipoAgregar(newData);
            resolve();
        }, 1000);
    });
}
