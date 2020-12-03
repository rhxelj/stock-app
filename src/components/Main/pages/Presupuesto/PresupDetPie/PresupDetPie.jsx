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
export default function PresupDetPie() {
    HeaderTitle("Detalle de Pie de Presupuesto")
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
                ]}
                icons={tableIcons}
                localization={localization}
                columns={columns}
                data={data}
                options={{
                    exportAllData: true,
                    exportButton: true,
                    grouping: true,
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                }}
                editable={{
                    onRowAdd: newData =>
                        onRowAdd(newData).then(() => dataFetch()),
                    onRowUpdate: (newData, oldData) =>
                        onRowUpdate(newData, oldData).then(() => dataFetch()),
                    onRowDelete: oldData =>
                        onRowDelete(oldData).then(() => dataFetch()),
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
