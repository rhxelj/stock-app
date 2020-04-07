import React, { Component, useState, useEffect } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

// import Button from '@material-ui/core/Button';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";

function StkMonedasBorrar(props) {
  const [state, setState] = useState({
    // url:'http://localhost:4000/stkmonedasborrar/',
    monedas: [],
    // filtrado:[],
    filtered: "",
    toggle: true,
    id: ""
  });

  function toggle(event) {
    setState(...state, prevState => ({
      toggle: !prevState.toggle
    }));
  }

  // //Delete
  const deleteProduct = id => {
    const url = IpServidor + "/stkmonedasborrar/" + id;
    request
      //   .delete(this.state.url +id)
      .delete(url)
      .set("Content-Type", "application/json")
      //.set('X-API-Key', 'foobar')
      .then(function(res) {
        // res.body, res.headers, res.status
      })

      .catch(err => CodigoError(err));
    this.props.read();
    this.toggle();
  };

  return (
    <>
      <IconButton onClick={() => this.toggle()} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      <div className="center-align">
        <p>Esta seguro de "BORRAR" este Registro?</p>
        <IconButton
          color="primary"
          onClick={() => this.deleteProduct(this.props.idMonedas)}
        >
          <DoneIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => this.toggle()}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  );
}

export default StkMonedasBorrar;
