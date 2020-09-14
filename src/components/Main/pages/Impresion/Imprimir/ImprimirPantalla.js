// import React, { Component} from 'react'
import printJS from "print-js";
// import { withStyles } from '@material-ui/core/styles';

printJS({
  maxWidth: 800,
  properties: properties,
  scanStyles: false,
  printable: datos,
  type: "json",
  // onPrintDialogClose:this.props.toggleImprimir()
});
