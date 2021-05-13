
// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from 'react';
import { Dialog } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography';
import IpServidor from '../../VariablesDeEntorno'
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
                    // data={require('../../../../../docspdf/basics.pdf')}

                    //  data={require('../../../../../docspdf/basics.pdf')}
                    data={require('../static/media/basics.pdf')}
                    type="application/pdf"
                    width='100%'
                    height='100%'
                    cache='false'
                >
                </object>

            </Dialog>
        </div >
    );

}

