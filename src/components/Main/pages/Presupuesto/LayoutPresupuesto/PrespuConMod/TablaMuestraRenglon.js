import React, { useState, useEffect } from "react";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MaterialTable from "material-table";
import { presuprenglonleer } from "./PresupRenglonLeer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
/*, `PresupRenglonLargo`, `PresupRenglonAncho`, `PresupRenglonImpUnit`, `PresupRenglonImpItem`*/
export default function TablaMuestraRenglon(props) {
    const { open, handleClose, Presup } = props;
    // const [maxWidth, setMaxWidth] = React.useState('sm');
    const [renglon, setRenglon] = useState({
        columns: [
            {
                title: "Cantidad",
                field: "PresupRenglonCant",
            },
            {
                title: "Descripción",
                field: "PresupRenglonDesc",
            },
            {
                title: "Largo",
                field: "PresupRenglonLargo",
                type: "numeric",
            },
            {
                title: "Ancho",
                field: "PresupRenglonAncho",
                type: "numeric",
            },
            {
                title: "Imp.Unit.",
                field: "PresupRenglonImpUnit",
                type: "currency",
            },
            {
                title: "Imp.Item.",
                field: "PresupRenglonImpItem",
                type: "currency",
            },
        ],

        datarenglon: [],
    });

    async function leerenglones(Presup) {
        const result = await presuprenglonleer(Presup);
        setRenglon({ ...renglon, datarenglon: result });
    }

    useEffect(() => {
        leerenglones(Presup);
    }, [Presup]);

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'xl'}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {"Renglones de Presupuesto"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <MaterialTable
                        icons={tableIcons}
                        localization={localization}
                        title=""
                        columns={renglon.columns}
                        data={renglon.datarenglon}
                    ></MaterialTable>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cerrar
        </Button>
            </DialogActions>
        </Dialog>
    );
}