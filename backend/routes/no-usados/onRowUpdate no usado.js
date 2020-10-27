// import { presupConfTipoModificar } from "./presupConfTipoModificar";

export function onRowUpdate(newData, oldData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            {
                // presupConfTipoModificar(newData);
            }
            resolve();
        }, 1000);
    });
}
