import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function presupdetpieData() {
    return new Promise(function (resolve, reject) {
        const url = IpServidor + "/presupdetpieleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const grupos = JSON.parse(res.text);
                resolve(grupos);
                //.catch() //Todo: agregar el catch error.
            });
    });
}
