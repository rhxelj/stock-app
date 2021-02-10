import request from "superagent";

import IpServidor from '../../VariablesDeEntorno'
import CodigoError from '../../../../lib/CodigoError'
// Lee Rubro por codigo de gupo
import { Document, Page } from 'react-pdf';
import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export const PresupPreview = (props) => {
    function cierradialogo() {
        props.setOpen({ ppreview: false });
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={props.open}

            >
                <MuiDialogTitle>
                    <IconButton onClick={cierradialogo} color='primary' edge='start' size='small'>
                        <CloseIcon />
                        <Typography variant="subtitle2">Cierra Impresión</Typography>
                    </IconButton>
                </MuiDialogTitle>
                <object
                    data={require('../Presup-Impresion/basics.pdf')}
                    type="application/pdf"
                    width='100%'
                    height='100%'
                >
                </object>
            </Dialog>

        </div>
    );

}

