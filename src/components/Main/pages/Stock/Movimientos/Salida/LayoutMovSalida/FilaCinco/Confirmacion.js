import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useContext } from "react";
import { StkMovSalidaContext } from "../StkMovSalida";
import { descargaStock } from "../descargaStock";
import { initial_state } from "../../Initial_State";

import { Exito } from "../../../../../../../../Ui-Components/Exito";

export default function AlertDialog(props) {
  const { state, setState } = useContext(StkMovSalidaContext);
  const { title, contentText } = props;
  const { exito, setExito } = React.useState(false);

  const handleClose = () => {
    setState({ ...state, confOpen: false });
  };

  const actions = {
    confirmAction: () => descargaStock(state).then(setState(initial_state)),
    cancelAction: () => setState(initial_state, () => handleClose()),
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
          <Button
            variant="contained"
            color="primary"
            onClick={actions.confirmAction}
          >
            Verificado
          </Button>
          <Button
            variant="contained"
            color="secondary"
            // onClick={this.handleClose}
            onClick={actions.cancelAction}
          >
            Cancelar
          </Button>

          <Exito open={exito} />
          {/* </div> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
