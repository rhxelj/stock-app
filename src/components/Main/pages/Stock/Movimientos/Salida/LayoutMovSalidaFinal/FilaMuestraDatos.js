import React from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./styles";
import { stkGrabaMovSalFinal } from "./StkGrabaMovSalFinal";
import { stkGrabaMovSalEnvase } from "./StkGrabaMovSalEnvase";
import ComboBCC from "../../../../../../lib/ComboBCC";
import ImprimirEtiquetas from "../LayoutMovSalidaFinal/ImprimirEtiquetas";
import { initial_state } from "./Initial_State";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { useContext } from "react";
import { StkMovSalidaFinalContext } from "./StkMovSalidaFinal";

const StyledTableCell1 = withStyles(() => ({
  head: {
    fontSize: 12,
    backgroundColor: "#e7edf1",
    color: "#1b1647",
    height: 30,
    boxShadow: "4px 4px #4a0bd5",
  },
  body: {
    fontSize: 12,
    backgroundColor: "#e7edf1",
    color: "#1b1647",
    boxShadow: "4px 4px #4a0bd5",
  },
  // tableRightBorder: {
  //     borderWidth: 0,
  //     borderRightWidth: 1,
  //     borderColor: 'blue',
  //     borderStyle: 'solid',
  // },
}))(TableCell);
const StyledTableCell2 = withStyles(() => ({
  head: {
    fontSize: 12,
    backgroundColor: "#d5dadf",
    color: "#224060",
    height: 30,
    boxShadow: "4px 4px #4a0bd5",
  },
  body: {
    fontSize: 12,
    backgroundColor: "#d5dadf",
    color: "#224060",
    boxShadow: "4px 4px #4a0bd5",
  },
  // tableRightBorder: {
  //     borderWidth: 0,
  //     borderRightWidth: 1,
  //     borderColor: 'blue',
  //     borderStyle: 'solid',
  // },
}))(TableCell);
const StyledTableCell3 = withStyles(() => ({
  head: {
    fontSize: 12,
    backgroundColor: "#d0d0d9",
    color: "#1b1647",
    height: 30,
    boxShadow: "4px 4px #4a0bd5",
  },
  body: {
    fontSize: 12,
    backgroundColor: "#d0d0d9",
    color: "#1b1647",
    boxShadow: "4px 4px #4a0bd5",
  },
  // tableRightBorder: {
  //     borderWidth: 0,
  //     borderRightWidth: 1,
  //     borderColor: 'blue',
  //     borderStyle: 'solid',
  // },
}))(TableCell);
const StyledTableCell4 = withStyles((theme) => ({
  head: {
    fontSize: 12,
    backgroundColor: "#e9dfed",
    color: theme.palette.common.black,
    //Shadow: '  4px 4px #4a0bd5',
    boxShadow: "4px 4px #4a0bd5",
  },
  body: {
    fontSize: 12,
    backgroundColor: "#e9dfed",
    color: theme.palette.common.black,
    boxShadow: "4px 4px #4a0bd5",
  },
  // table: {
  //     borderWidth: 0,
  //     borderRightWidth: 1,
  //     borderColor: 'black',
  //     borderStyle: 'solid',
  // },
}))(TableCell);
export default function FilaMuestraDatos(props) {
  const { state, setState } = useContext(StkMovSalidaFinalContext);
  var nuevacantstock;
  var nuevacantdisp = state.StkItemsCantDisp;
  if (state.largopasa === 0) {
    nuevacantstock = state.StkItemsCantidad - state.cantarestar;
    nuevacantdisp = state.StkItemsCantDisp - state.cantarestar;
  } else {
    nuevacantstock = state.StkItemsCantidad - state.cantarestar;
  }

  async function actualizainf() {
    await stkGrabaMovSalFinal(
      state.grupo,
      state.rubro,
      state.item,
      nuevacantstock,
      nuevacantdisp
    );
    await stkGrabaMovSalEnvase(
      state.nroenvase,
      state.grupo,
      state.rubro,
      state.item,
      state.cantarestar
    );
  }
  const classes = useStyles();

  const confirmar = async (state) => {
    await actualizainf();
    if (nuevacantstock > 0) {
      setState({ ...state, imp_etiquetas: true });
    }
  };

  const actions = {
    confirmAction: () => confirmar(state), //Accion a ejecutar en caso de Aceptar
    cancelAction: () => setState(initial_state), //Accion a ejecutar en caso de cancelar
    confirmText: "CONFIRMAR", //Texto en caso de afirmativo
    cancelText: "CANCELAR", //Texto en caso de No afirmativo
  };

  toast.configure();
  return (
    <>
      {props.open && (
        <Grid container item justify="center">
          {/* //aria-label="simple table" */}
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {/* <StyledTableCell align="center" backgroundColor='#FFF' color='#FFF' >Envase </StyledTableCell> */}
                <StyledTableCell1 align="center">Envase </StyledTableCell1>
                <StyledTableCell1 align="center" colSpan={2}>
                  Detalle
                </StyledTableCell1>
                <StyledTableCell2 align="center" colSpan={2}>
                  Stock{" "}
                </StyledTableCell2>
                <StyledTableCell3 align="center" colSpan={2}>
                  Disponibilidad
                </StyledTableCell3>
                <StyledTableCell4 align="center">Cantidad</StyledTableCell4>
              </TableRow>
              <TableRow>
                <StyledTableCell1> </StyledTableCell1>
                <StyledTableCell1> </StyledTableCell1>
                <StyledTableCell1> </StyledTableCell1>
                <StyledTableCell2
                  className={classes.tableRightBorder}
                  align="center"
                >
                  Anterior{" "}
                </StyledTableCell2>
                <StyledTableCell2
                  className={classes.tableRightBorder}
                  align="center"
                >
                  Actual{" "}
                </StyledTableCell2>
                <StyledTableCell3
                  className={classes.tableRightBorder}
                  align="center"
                >
                  Anterior{" "}
                </StyledTableCell3>
                <StyledTableCell3
                  className={classes.tableRightBorder}
                  align="center"
                >
                  Actual{" "}
                </StyledTableCell3>
                <StyledTableCell4
                  className={classes.tableRightBorder}
                  align="center"
                >
                  {" "}
                </StyledTableCell4>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell1 align="center">
                  {state.nroenvase}
                </StyledTableCell1>
                <StyledTableCell1 align="center">
                  {state.StkItemsRubroAbr}
                </StyledTableCell1>
                <StyledTableCell1 align="center">
                  {state.StkItemsDesc}
                </StyledTableCell1>

                <StyledTableCell2 align="center">
                  {state.StkItemsCantidad}
                </StyledTableCell2>
                <StyledTableCell2
                  style={
                    nuevacantstock < state.StkItemsMin
                      ? { background: "#f92c19" }
                      : {}
                  }
                  align="center"
                >
                  {nuevacantstock}
                </StyledTableCell2>
                <StyledTableCell3 align="center">
                  {state.StkItemsCantDisp}
                </StyledTableCell3>
                <StyledTableCell3 align="center">
                  {nuevacantdisp}
                </StyledTableCell3>
                <StyledTableCell4 align="center">
                  {state.cantarestar}
                </StyledTableCell4>
              </TableRow>
            </TableBody>
          </Table>

          {/* Todo: revisar esta parate y cambiarla por el ComboBCC para que me imprima las etiquetas de QR*/}
          {/* <Button
            id="botonconf"
            variant="contained"
            color="primary"
            onClick={actualizainf}
          >
            Confirmar
          </Button> */}

          {/* ComboBCC */}
          <ComboBCC actions={actions} />

          {/* <Confirmacion
            open={state.confOpen}
            title="Movimiento de Entrada"
            contentText={`Cambio efectuado cantidad disponible ${cantidaddisponible}`}
            // handleClose={handleClose}
            // imprimir={imprimir_etiquetas}
          /> */}

          <ImprimirEtiquetas
            open={state.imp_etiquetas} //inicialmente este componente no se muestra
          // title="Impresion De Etiquetas"
          // contentText="Imprimio correctamente ?"
          />
        </Grid>
      )}
    </>
  );
}
