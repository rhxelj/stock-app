import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { imprimirQr } from "../../../../../Impresion/ImprimirEtiquetas/imprimirQR";
import { useContext } from "react";
import { StkMovEntradaContext } from "../../StkMovEntrada";

export default function AlertDialog(props) {
  const { state, setState } = useContext(StkMovEntradaContext);
  const { title, contentText } = props;
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setState({ ...state, imp_etiquetas: true, confOpen: false });
  };

  // function imprimirEtiquetas(prop) {
  //   alert("imprimiendo Etiquetas");

  //   handleClose();
  // }

  const imprimir_etiquetas = () => {
    // handleClose();
    // llamo al componente a imprimir y le paso el dato de ubicacion fisica
    // console.log(
    //   "Fila Cinco contenido de state.StkEnvaseUbG -> ",
    //   state.StkEnvaseUbG
    // );
    // imprimirQr(state.StkEnvaseUbG);

    // setState(initial_state);
    // setState(() => {
    //   return initial_state;
    // });

    setState({ ...state, imp_etiquetas: true, confOpen: false });
    // setState({ ...state, imp_etiquetas: true });
  };

  return (
    <div>
      <Dialog
        open={state.confOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={imprimirEtiquetas} color="primary" autoFocus> */}
          {/* <Button onClick={imprimir_etiquetas} color="primary" autoFocus>
            Imprimir
          </Button> */}
          <Button onClick={handleClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
