import { leeStkRubro } from '../../Stock/Items/leeStkRubro'

export async function presupconftipoColumns() {
    const stkRubros = await leeStkRubro(); //llamo a leer grupo
    var objstkrubro = await stkRubros.reduce(function (acc, cur, i) {
        acc[cur.StkRubroAbr] = cur.StkRubroDesc;
        return acc;
    }, {});
    return columnsFill(objstkrubro);
}

function columnsFill(objstkrubro) {
    return new Promise(function (resolve, reject) {
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
                title: "Es Anexo?",
                field: "PresupConfTipoAnexo",
            }
        ]);
    });
}
