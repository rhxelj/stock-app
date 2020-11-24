import { presupDetPieModificar } from "./presupDetPieModificar";

export function onRowUpdate(newData, oldData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            presupDetPieModificar(newData);
            resolve();
        }, 1000);
    });
}
