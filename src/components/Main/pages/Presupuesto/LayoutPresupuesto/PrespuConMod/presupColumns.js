import React from "react";
import { isNullishCoalesce } from "typescript";
import { ClientesLeerPresup } from "../../../Clientes/ClientesLeerPresup"

export async function presupColumns() {

    const cliente = await ClientesLeerPresup();



    var objcliente = await cliente.reduce(function (acc, cur) {
        acc[cur.PresupEncabCliente] = cur.ClientesDesc;
        return acc;
    }, {});
    return columnsFill(objcliente)
}
function columnsFill(objcliente) {
    return new Promise(function (resolve, reject) {
        //    console.log('objcliente  ', objcliente(1))
        resolve([
            {
                title: "Presupuesto Nro",
                field: "idPresupEncab",
                editable: "never",
                order: true,
            },
            {
                title: "Cliente Temporal ",
                field: "PresupEncabCliente",
                native: true,

            },
            {
                title: "Cliente ",
                field: "PresupEncabCliente",
                lookup: objcliente,
                native: true,

            },

            {
                title: "Fecha",
                field: "PresupEncabFecha",
                type: "date",
                order: true,
            },
            {
                title: "MayMin",
                field: "PresupEncabMayMin",
                order: true,
            },
            {
                title: "Total",
                field: "PresupEncabTotal",
                order: true,
            },

        ]);
    });
}
