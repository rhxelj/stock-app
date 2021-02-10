import React, { useState, useEffect } from "react";
import { TextField, Button, Dialog, Popover } from "@material-ui/core";
import useStyles from "../styles";
import MayMin from '../Confeccion/MayMin'
import TipoConfeccion from '../Confeccion/TipoConfeccion'
import FilaDos from '../Confeccion/FilaDos'
import { useContext } from "react";
import { PresupuestosContext } from "../../Presupuestos";

export default function DatosPresupuesto(props) {
    // Esto es para poder consumir los datos del CONTEXTAPI
    const { state, setState } = useContext(PresupuestosContext);
    const { open, handleClose } = props




    const classes = useStyles();
    return (
        <>
            <Popover
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <MayMin></MayMin>
                <TipoConfeccion></TipoConfeccion>
                <FilaDos></FilaDos>
            </Popover>
        </>
    );
}



