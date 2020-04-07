import React, { Component, useState, useEffect } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";

import StkMonedasAgregar from "./StkMonedasAgregar";
import StkMonedasBorrar from "./StkMonedasBorrar";
import StkMonedasModificar from "./StkMonedasModificar";

import { withStyles } from "@material-ui/core/styles";
import "../../../../Styles/TableHeader.css";

import MaterialTable from "material-table";
import { style, styles, CustomTableCell, initial_state } from "./Constants";
import { tableIcons } from "./Constants";

function Monedas() {
  const [state, setState] = useState(initial_state);

  //Read
  const read = (_) => {
    const url = IpServidor + "/stkmonedasleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const monedas = JSON.parse(res.text);
        // setState({monedas: monedas})
        setState({ ...state, monedas });
      });
  };

  const classes = styles;

  var columns = [
    {
      title: "Código",
      field: "idStkMonedas",
      order: true,
    },
    {
      title: "Descripción",
      field: "StkMonedasDescripcion",
      order: true,
    },
    {
      title: "Cotización",
      field: "StkMonedasCotizacion",
      order: true,
    },
  ];

  const addMoneda = (_) => {
    const url = IpServidor + "/stkmonedasagregar";

    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ idStkMonedas: state.moneda.idStkMonedas })
      .send({ StkMonedasDescripcion: state.moneda.StkMonedasDescripcion })
      .send({ StkMonedasCotizacion: state.moneda.StkMonedasCotizacion })
      .set("X-API-Key", "foobar")
      .then(function(res) {
        // res.body, res.headers, res.status
        //     console.log('res.status  ' + res.status);
        //     console.log('esta aca');
        //     alert('Agrego correctamente');
      });
    // .catch((err) => CodigoError(err));
  };

  useEffect(() => {
    read();
    // return () => {
    //   setState({ state: state });
    // };
  }, []);

  useEffect(() => {
    if (state.moneda.idStkMonedas != "") {
      addMoneda();
      read();
      // setState(initial_state);
      // return () => {
      //   setState(initial_state);
      //   // console.log("Cleaning UP!!!");
      // };
    }
  }, [state.moneda.idStkMonedas]);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="ABM DE Monedas"
        columns={columns}
        data={state.monedas}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              console.log("state.moneda: ", state.moneda);
              const moneda = newData;
              setState({ ...state, moneda: moneda });
              resolve();
            }, 1000),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  console.log("newData", newData);
                  console.log("oldData", oldData);
                  // alert("modifico la fila");
                  // const data = state.data;
                  // const index = data.indexOf(oldData);
                  // data[index] = newData;
                  // setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  console.log("oldData", oldData);
                  // alert("Borro la fila");
                  // let data = state.data;
                  // const index = data.indexOf(oldData);
                  // data.splice(index, 1);
                  // setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
}

export default withStyles(styles)(Monedas);
