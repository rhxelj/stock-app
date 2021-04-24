import { leeStkRubro } from '../../Stock/Items/leeStkRubro'

export async function presupconftipoColumns() {
    const stkRubros = await leeStkRubro(); //llamo a leer grupo
    var objstkrubro = await stkRubros.reduce(function (acc, cur) {
        acc[cur.StkRubroAbr] = cur.StkRubroDesc;
        return acc;
    }, {});
    return columnsFill(objstkrubro);
}

function columnsFill(objstkrubro) {
    return new Promise(function (resolve) {
        resolve([
            {
                title: "Presup.Tipo(ID)",
                field: "idPresupConfTipo",
                editable: "never",
                order: true,
            },
            {
                title: "Descripción",
                field: "PresupConfTipoDesc",
                order: true,
            },
            {
                title: "Rubro Abr",
                field: "PresupConfTipoRubro",
                lookup: objstkrubro,
            },
            {
                title: "Cantidad",
                field: "PresupConfTipoCant",
                order: true,
            },
            {
                title: "Es m2 S/N",
                field: "PresupConfTipoM2",
            },

            {
                title: "Es Anexo?",
                field: "PresupConfTipoAnexo",
            },
            {
                title: "Pide Largo?",
                field: "PresupConfTipoLargo",
            },
            {
                title: "Pide Ancho?",
                field: "PresupConfTipoAncho",
            },
            {
                title: "Imprime?",
                field: "PresupConfTipoImprime",
            },
            {
                title: "Min. MOT",
                field: "PresupConfTipoMinMOT",
            }
        ]);
    });
}
