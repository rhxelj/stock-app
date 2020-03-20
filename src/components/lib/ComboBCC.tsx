import React from "react";
import { Button, Paper } from "@material-ui/core";

export default function ComboBCC(props: any) {
  return (
    <>
      <Button
        onClick={props.actions.confirmar}
        style={{ margin: ".5rem" }}
        variant="contained"
        color="primary"
      >
        Confirmar
      </Button>
      <Button
        onClick={props.actions.cancelar}
        style={{ margin: ".5rem" }}
        variant="contained"
        color="secondary"
      >
        Cancelar
      </Button>
    </>
  );
}
