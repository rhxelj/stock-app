import { presupDetPieBorrar } from "./presupDetPieBorrar";

export function onRowDelete(oldData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            presupDetPieBorrar(oldData);
            resolve();
        }, 1000);
    });
}
