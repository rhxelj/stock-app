import React, { Component } from "react";
import request from "superagent";

import IpServidor from "../VariablesDeEntorno";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 100,
    maxWidth: 400
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const TipoConfeccion = [
  {
    indiceconf: 1,
    detalle: "Por Metro"
  },
  {
    indiceconf: 2,
    detalle: "Con Dobladillo"
  },
  {
    indiceconf: 3,
    detalle: "Con Fajas"
  },
  {
    indiceconf: 4,
    detalle: "Paño Unido"
  },
  {
    indiceconf: 5,
    detalle: "Enrollable"
  },
  {
    indiceconf: 6,
    detalle: "Con Ojales cada :"
  }
];

class StkEligeTipoPresup extends Component {
  constructor(props) {
    super();
    this.state = {
      TConfec: 0,
      open: true
    };
  }

  componentDidMount() {}
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  eligeconfeccion = prop => event => {
    // this.setState({[prop]: event.target.value})
    console.log("this.state.indiceconf");
    console.log(this.state.indiceconf);
    console.log(event.target.value);
    console.log(prop);
    this.setState({ [prop]: event.target.value }, () =>
      this.confeleg(this.state.indiceconf)
    );
    console.log(this.state.indiceconf);
  };

  confeleg = tipo => {
    console.log("tipo");
    console.log(tipo);
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
            <Grid item xs={1} sm={1} lg={1}></Grid>
            <Grid item xs={7} sm={7} lg={7}>
              <DialogTitle id="form-dialog-title">Presupuesto</DialogTitle>
            </Grid>
            <Grid item xs={3} sm={3} lg={3}></Grid>
          </Grid>
          <DialogContent>
            {/* <Grid container  spacing={32}> */}
            {/* <Grid item  xs={12} sm={12} lg={12}> */}
            <TextField
              id="TConfec"
              select
              label="Tipo Confección"
              fullWidth
              value={this.state.indiceconf}
              onChange={this.eligeconfeccion("TConfec")}
              SelectProps={{
                native: true
              }}
              autoFocus={true}
            >
              <option></option>
              {TipoConfeccion.map(option => (
                <option key={option.indiceconf} value={option.indiceconf}>
                  {option.detalle}
                </option>
              ))}
            </TextField>
            <h1>{this.props.CobEleg}</h1>
            <h2>{this.state.indiceconf}</h2>
            {/* </Grid> */}
            {/* </Grid>      */}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(StkEligeTipoPresup);
