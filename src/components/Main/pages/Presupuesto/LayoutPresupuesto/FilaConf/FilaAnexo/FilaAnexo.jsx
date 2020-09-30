import React, { useEffect, useState } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../../lib/material-table/localization";
import { presupcalculador } from "../../../PresupCalculador";
import { filaanexosColumns } from "./filaanexosColumns";
import filaanexosData from "./filaanexosData";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { TextField, Button } from "@material-ui/core";
import { HeaderTitle } from '../../../../../../lib/HeaderTitle'


// Context
import { useContext } from "react";
import { PresupPantContext } from '../../../PresupPant'


export default function FilaAnexo(props) {
    HeaderTitle("Anexos")
    const { state, setState } = useContext(PresupPantContext);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [datosanexo, setDatosAnexo] = useState([])
    const [suma, setSuma] = React.useState(0);
    const [detalle, setDetalle] = useState('')
    async function columnsFetch() {
        const col = await filaanexosColumns();
        setColumns(() => col);
    }

    function finaliza() {
        console.log('finaliza')
        var datospresup = [
            {
                StkRubroDesc: detalle,
                ImpItemAnexo: suma,
            },
        ];

        setState({ ...state, renglonanexo: datospresup[0] });
    }

    function sumar() {
        var nombre = ''
        var importetotal = 0
        var i = 0;
        while (i < datosanexo.length) {
            importetotal = importetotal + datosanexo[i].importea;
            nombre = nombre + ' c/' + datosanexo[i].PresupConfTipoDesc;
            i++;
        }
        setSuma(importetotal);
        setDetalle(nombre)
    }

    async function dataFetch() {
        const data = await filaanexosData();
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
                title="ANEXOS"

                icons={tableIcons}
                localization={localization}
                columns={columns}
                data={datosanexo}
                options={{
                    search: false,
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                }}
                components={{
                    Toolbar: (props) => (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{ padding: "0px 10px" }}>
                                <Button
                                    onClick={() => sumar()}
                                    color="primary"
                                    style={{ marginRight: 5 }}
                                >
                                    Suma
                          </Button>
                                <Button
                                    onClick={() => finaliza()}
                                    color="primary"
                                    style={{ marginRight: 20 }}
                                >
                                    Final
                          </Button>

                                {/* <TextField */}
                                <CurrencyTextField
                                    id="Suma"
                                    label="Total presupuesto : "
                                    value={suma}
                                    type="currency"
                                />

                                {/* </TextField> */}
                            </div>
                        </div>
                    ),
                }}
                editable={{
                    // onRowAdd: (newData) =>
                    //  onRowAdd(newData),
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                var datosrenglon1 = presupcalculador(
                                    "", "",
                                    newData.PresupConfTipoDesc
                                );
                                Promise.resolve(datosrenglon1).then((jsonResults) => {
                                    newData.importea = jsonResults[0].ImpItem * newData.AnexoMedida
                                    setDatosAnexo([...datosanexo, newData]);
                                })
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;

                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...datosanexo];
                                const index = oldData.tableData.id;
                                var datosrenglon1 = presupcalculador(
                                    "", "",
                                    newData.PresupConfTipoDesc
                                );
                                Promise.resolve(datosrenglon1).then((jsonResults) => {
                                    newData.importea = jsonResults[0].ImpItem * newData.AnexoMedida
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;

                                    setDatosAnexo([...dataUpdate]);
                                })
                                resolve();
                            }, 1000);
                        }),

                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...datosanexo];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setDatosAnexo([...dataDelete]);

                                resolve();
                            }, 1000);
                        })
                }}
            />
            {/* <Imprimir
                columns={columns}
                datos={data}
                open={imprimirTF.imprimir}
                setOpen={setImprimirTF}
            /> */}
        </div>
    );
}
