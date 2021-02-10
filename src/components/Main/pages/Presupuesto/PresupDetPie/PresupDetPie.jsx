import React, { useEffect, useState } from "react";

import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import { presupdetpieColumns } from "./presupdetpieColumns";
import { presupdetpieData } from "./presupdetpieData";

import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { HeaderTitle } from "../../../../lib/HeaderTitle"
import Imprimir from "../../Impresion/Imprimir/Imprimir";
import {
    red,
    blue,
    green,
    blueGrey,
    purple,
    teal,
} from "@material-ui/core/colors";
export default function PresupDetPie() {
    HeaderTitle("Detalles de Pie de Presupuesto")
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

    async function columnsFetch() {
        const col = await presupdetpieColumns();
        setColumns(() => col);
    }

    async function dataFetch() {
        const data = await presupdetpieData();
        setData(data);
    }

    async function initialFetch() {
        columnsFetch();
        dataFetch();
    }

    function seleccion(evt, data) {
        console.log(data)
        console.log(evt)
    }

    useEffect(() => {
        initialFetch();
    }, []);

    return (
        <div>
            <MaterialTable
                title=""
                actions={[
                    {
                        icon: () => <tableIcons.Print />,
                        tooltip: "Imprimir",
                        isFreeAction: true,
                        onClick: (event) => setImprimirTF({ imprimir: true }),
                    },
                    {
                        tooltip: 'Acepta Selección',
                        showTextRowsSelected: 'false',
                        icon: () => (
                            <tableIcons.LibraryAddCheck string='cooc' style={{ color: red[500] }} fontSize='large' />
                        ),
                        onClick: (evt, data) => seleccion(evt, data),

                    }
                ]}
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: newData =>
                        onRowAdd(newData).then(() => dataFetch()),
                    onRowUpdate: (newData, oldData) =>
                        onRowUpdate(newData, oldData).then(() => dataFetch()),
                    onRowDelete: oldData =>
                        onRowDelete(oldData).then(() => dataFetch()),
                }}
                icons={tableIcons}
                localization={localization}
                options={{
                    selection: true,
                    exportAllData: true,
                    exportButton: true,
                    grouping: true,
                    addRowPosition: "first",
                    showTextRowsSelected: 'true',
                    actionsColumnIndex: -1,
                }}

            />
            <Imprimir
                columns={columns}
                datos={data}
                open={imprimirTF.imprimir}
                setOpen={setImprimirTF}
            />
        </div>
    );
}
