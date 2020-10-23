import React, { useEffect, useState } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../../lib/material-table/localization";
import { presupcalculador } from "../../../PresupCalculador";
import { filaanexosColumns } from "./filaanexosColumns";
import filaanexosData from "./filaanexosData";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Input, InputAdornment, FilledInput, TextField, Grid, Button, Dialog, IconButton } from "@material-ui/core";
import { HeaderTitle } from '../../../../../../lib/HeaderTitle'
import { red, blue, green } from '@material-ui/core/colors';



// Context
import { useContext } from "react";
import { PresupPantContext } from '../../../PresupPant'


export default function FilaAnexo(props) {
    HeaderTitle("Anexos")
    var renglonanexo = []
    const { state, setState } = useContext(PresupPantContext);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [datosanexo, setDatosAnexo] = useState([])
    const [sumaanexo, setSumaAnexo] = React.useState(0.00);
    // const [detalle, setDetalle] = useState('')


    async function columnsFetch() {
        const col = await filaanexosColumns();
        setColumns(() => col);
    }


    function sumar() {
        var nombre = ''
        var importetotal = 0.00
        var i = 0;
        while (i < datosanexo.length) {
            importetotal = importetotal + datosanexo[i].importea;
            nombre = nombre + ' c/' + datosanexo[i].AnexoMedida + ' ' + datosanexo[i].PresupConfTipoDesc;
            i++;
        }
        setSumaAnexo(importetotal);

        var datospresup = [
            {
                StkRubroDesc: nombre,
                ImpItemAnexo: importetotal,
            },
        ];
        setState({ ...state, renglonanexo: datospresup[0] });

        setState({ ...state, datosanexo: datospresup[0] });
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
        <>

            <Grid container item xs={3}>
                <MaterialTable
                    localization={localization}
                    onChangeRowsPerPage={2}
                    style={props.style}
                    title={<CurrencyTextField
                        //  label={<tableIcons.AddShoppingCart style={{ color: red[500] }} onClick={(event) => sumar()} />}
                        // onClick={(event) => sumar()}
                        color='#FF0000'
                        value={sumaanexo}
                    >   </CurrencyTextField>}
                    icons={tableIcons}
                    columns={columns}
                    data={datosanexo}
                    options={{
                        search: false,
                        addRowPosition: "first",
                        actionsColumnIndex: -1,
                        pagesize: 2
                    }
                    }
                    actions={[
                        {

                            icon: () => <tableIcons.AddShoppingCart style={{ color: red[500] }} />,
                            tooltip: "Sumar Anexos",
                            //     isFreeAction: true,
                            onClick: (event) => sumar(),

                        }
                    ]}

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
                                    const dataUpdate = [...datosanexo];
                                    //     const index = oldData.tableData.id;
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


            </Grid>
        </>
    );

}


//     Toolbar: (props) => (

                    //         <div>

                    //             <MTableToolbar {...props} />

                    //             <div style={{ padding: "0px 10px" }}>
                    //                 <Button
                    //                     onClick={() => sumar()}
                    //                     color="primary"
                    //                     style={{ marginRight: 5 }}
                    //                 >
                    //                     Suma
                    //                 </Button>
                    //                 {/* <Input */}
                    //                 <CurrencyTextField
                    //                     id="SumaAnexo"
                    //                     label="Total presupuesto : "
                    //                     value={sumaanexo}
                    //                 // type="number"
                    //                 >
                    //                     {/* </Input> */}
                    //                 </CurrencyTextField>
                    //             </div>
                    //         </div>


                    // actions={[
                    //     {
                    //         icon: () => <tableIcons.SaveAlt />,
                    //         tooltip: "Suma",
                    //         isFreeAction: true,
                    //         onClick: (event) => sumar(),
                    //     }

                    // ]}