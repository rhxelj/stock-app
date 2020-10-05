import React, { useState, useEffect } from "react";

import { tableIcons } from "../../../lib/material-table/tableIcons";
import { localization } from "../../../lib/material-table/localization";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MaterialTable from "material-table";
import { stkitemsred } from "./StkItemsRed";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TablaMuestraStock(props) {
  const { open, handleClose, Grupo, Rubro } = props;

  const [stock, setStock] = useState({
    columns: [
      {
        title: "Detalle",
        field: "StkItemsDesc",
      },
      {
        title: "Cant.Disponible",
        field: "StkItemsCantDisp",
        type: "numeric",
      },
      {
        title: "Cantidad",
        field: "StkItemsCantidad",
        type: "numeric",
      },
    ],

    datastock: [],
  });

  async function stkitemsreduc(Grupo, Rubro) {
    const result = await stkitemsred(Grupo, Rubro);
    setStock({ ...stock, datastock: result });
  }

  useEffect(() => {
    stkitemsreduc(Grupo, Rubro);
  }, [Grupo, Rubro]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Stock de Items"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <MaterialTable
            icons={tableIcons}
            localization={localization}
            title="Stock"
            columns={stock.columns}
            data={stock.datastock}
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
