import React, { useEffect, useState } from "react";

import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import { presupconftipoColumns } from "./presupconftipoColumns";
import { presupconftipoData } from "./presupconftipoData";

import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { HeaderTitle } from "../../../../lib/HeaderTitle"
import Imprimir from "../../Impresion/Imprimir/Imprimir";
export default function PresupConfTipo() {
    HeaderTitle("Presupuesto Tipo")
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

    async function columnsFetch() {
        const col = await presupconftipoColumns();
        setColumns(() => col);
    }

    async function dataFetch() {
        const data = await presupconftipoData();
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
