import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";

import { presupColumns } from "./presupColumns";
import { presupDatos } from "./presupDatos";
import TablaMuestraRenglon from "./TablaMuestraRenglon"
// import { onRowAdd } from "./onRowAdd"
// import { onRowUpdate } from "./onRowUpdate"
// import { onRowDelete } from "./onRowDelete"
import WavesIcon from "@material-ui/icons/Waves";
import { HeaderTitle } from "../../../../../lib/HeaderTitle"

import Imprimir from "../../../Impresion/Imprimir/Imprimir";

export default function PresupMuestra() {
    HeaderTitle("PRESUPUESTOS")
    const [open, setOpen] = React.useState(false);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
    const [parampresup, setParamPresup] = useState({
        idPresup: 0,

    });
    async function columnsFetch() {
        const col = await presupColumns();
        setColumns(() => col);
    }

    async function dataFetch() {
        const data = await presupDatos();
        setData(data);
    }

    async function initialFetch() {
        columnsFetch();
        dataFetch();
    }
    const openApp = (event, idPresupEncab) => {
        setParamPresup({ parampresup, idPresup: idPresupEncab });
        handleClickOpen();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        initialFetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <MaterialTable
                title=""
                actions={[
                    {
                        icon: () => <WavesIcon />,
                        onClick: (event, rowData) =>
                            openApp(event, rowData.idPresupEncab, rowData.idStkRubro),
                    },
                    {
                        icon: () => <tableIcons.Print />,
                        // icon: "IMPRIMIR",
                        tooltip: "Imprimir",
                        isFreeAction: true,
                        onClick: () => setImprimirTF({ imprimir: true }),
                    }
                ]}
                columns={columns}
                data={data}
                // editable={{
                //     onRowAdd: newData =>
                //         onRowAdd(newData).then(() => dataFetch()),
                //     onRowUpdate: (newData, oldData) =>
                //         onRowUpdate(newData, oldData).then(() => dataFetch()),
                //     onRowDelete: oldData =>
                //         onRowDelete(oldData).then(() => dataFetch()),
                // }}
                icons={tableIcons}
                localization={localization}
                options={{
                    exportAllData: true,
                    exportButton: true,
                    grouping: true,
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                }}
            />
            <Imprimir
                columns={columns}
                datos={data}
                open={imprimirTF.imprimir}
                setOpen={setImprimirTF}
            />
            <TablaMuestraRenglon
                open={open}
                handleClose={handleClose}
                Presup={parampresup.idPresup}
            />
        </div>
    );
}
