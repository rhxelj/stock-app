import { presupDetPieAgregar } from "./presupDetPieAgregar";

export function onRowAdd(newData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            presupDetPieAgregar(newData);
            resolve();
        }, 1000);
    });
}
