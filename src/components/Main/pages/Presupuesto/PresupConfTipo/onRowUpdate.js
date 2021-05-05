import { presupConfTipoModificar } from "./presupConfTipoModificar";

export function onRowUpdate(newData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            presupConfTipoModificar(newData);
            resolve();
        }, 1000);
    });
}
