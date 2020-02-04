import React, { Component } from "react";
import QrReader from "react-qr-reader";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

// import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";

class StkScaneaQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      result: "No ha escaneado"
    };
  }
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <div>
        {/* <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >   */}
        {/* <DialogContent> */}
        <Grid container spacing={32}>
          <Grid item xs={12} sm={12} lg={12}></Grid>
          <DialogTitle id="form-dialog-title">Scaneo</DialogTitle>
          <Grid item xs={12} sm={12} lg={12}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} lg={6}></Grid>
          <QrReader
            delay={500}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "50%" }}
          />
          <p>{this.state.result}</p>
          <button onClick={() => this.props.datosscaneados(this.state.result)}>
            Acepta
          </button>
          {/* </DialogContent> */}
        </Grid>
        {/* </Dialog> */}
      </div>
    );
  }
}

export default StkScaneaQR;
