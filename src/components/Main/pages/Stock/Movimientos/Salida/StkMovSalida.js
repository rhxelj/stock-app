// import React, { Component} from 'react'
import React, { useState, useEffect } from "react";
import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react";
import { stat } from "fs";
import { HeaderTitle } from "../../../../../lib/HeaderTitle";

import FilaDos from "./LayoutMovSalida/FilaDos";
import FilaTres from "./LayoutMovSalida/FilaTres";
import FilaCinco from "./LayoutMovSalida/FilaCinco";
export const StkMovSalidaContext = React.createContext();

const initialState = {
  stkrubro: [],
  stkgrupo: [],
  stkitems: [],
  StkItemsCantidad: 0.0,
  StkItemsCantDisp: 0.0,
  StkItemsFAct: "",
  StkItemsMin: 0.0,
  StkItemsMax: 0.0,
  TConfec: 0,
  cantidad: 1.0,
  largo: 0.0,
  ancho: 0.0,
  faltante: 0.0,
  total: 0.0,
  datostraid: [],
  open: true,
  marcaver: false,
};
function StkMovSalida(props) {
  HeaderTitle("Salidas de stock por Confección en Venta");
  const [state, setState] = useState(initialState);

  const submit = () => {
    confirmAlert({
      title: "La Cantidad excede la Disponibilidad",
      message: "Confirma el Movimiento",
      buttons: [
        {
          label: "Si",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // Lee Grupo inicio
  const leestkgrupo = (_) => {
    const url = IpServidor + "/stkgrupoleer";
    console.log("url ");
    console.log(url);
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const stkgrupo = JSON.parse(res.text);
        setState(() => {
          return { ...state, stkgrupo: stkgrupo };
        });
      });
    console.log("state.stkgrupo");
    console.log(state.stkgrupo);
  };

  //lee rubro por código de grupo
  const stkrubroleecodgrupo = (id) => {
    const url = IpServidor + "/stkrubroleecodgrupo/" + id;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const stkrubro = JSON.parse(res.text);
        setState(() => {
          return { ...state, stkrubro: stkrubro };
        });
      });

    // this.marcagrupo()
  };

  const stkitemsleecodgryrb = (idStkRubro) => {
    var idStkGrupo = state.StkItemsGrupo;
    const url =
      IpServidor +
      "/stkitemsleecodgryrb/?idStkGrupo=" +
      idStkGrupo +
      "&idStkRubro=" +
      idStkRubro;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const stkitems = JSON.parse(res.text);
        setState(() => {
          return { ...state, stkitems: stkitems };
        });
      });
  };

  const stkitemsleecodgrrbit = () => {
    var idStkItems = state.StkItems;
    var idStkGrupo = state.StkItemsGrupo;
    var idStkRubro = state.StkItemsRubro;
    const url =
      IpServidor +
      "/stkitemsleecodgrrbit/?idStkItems=" +
      idStkItems +
      "&idStkGrupo=" +
      idStkGrupo +
      "&idStkRubro=" +
      idStkRubro;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const stkitemse = JSON.parse(res.text);
        setState({ ...state, stkitemse: stkitemse });
        setState({
          ...state,
          StkItemsCantidad: state.stkitemse[0].StkItemsCantidad,
        });
        setState({
          ...state,
          StkItemsCantDisp: state.stkitemse[0].StkItemsCantDisp,
        });
        setState({
          ...state,
          StkItemsFAct: state.stkitemse[0].StkItemsFAct,
        });
        setState({
          ...state,
          StkItemsMin: state.stkitemse[0].StkItemsMin,
        });
        setState({
          ...state,
          StkItemsMax: state.stkitemse[0].StkItemsMax,
        });
        var recorte = state.StkItemsFAct.substr(0, 10);
        setState({ ...state, StkItemsFAct: recorte });
      });
  };
  // useEffect(){
  //   componentWillMount() {
  //     this.leestkgrupo();
  //   }
  // }

  useEffect(() => {
    leestkgrupo();
    return () => {
      // cleanup esto lo ejecuta cuando cierro el componente es como un componentWillUnmount
    };
  }, []);

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleChangeGrupo = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value }, () =>
      stkrubroleecodgrupo(state.StkItemsGrupo)
    );
  };
  const handleChangeRubro = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value }, () =>
      stkitemsleecodgryrb(state.StkItemsRubro)
    );
  };

  const handleChangeItems = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value }, () =>
      stkitemsleecodgrrbit()
    );
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const verificadisp = (_) => {
    var cant = Number(state.cantidad);
    var larg = Number(state.largo);
    var anch = Number(state.ancho);

    const url = IpServidor + "/stkverificadisp";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cant: cant })
      .send({ larg: larg })
      .send({ anch: anch })
      .send({ StkItemsCantDisp: state.StkItemsCantDisp })
      .send({ TConfec: state.TConfec })
      .then((res) => {
        const faltantev = JSON.parse(res.text);
        setState({ ...state, datostraid: faltantev });
        setState({ ...state, marcaver: true });
        setState({ ...state, faltante: state.datostraid[0] });
        setState({ ...state, total: state.datostraid[1] });
      });
  };
  // descargastock = _ => {
  //   alert('descarga stock')
  //   }
  const descargastock = (_) => {
    const url =
      IpServidor +
      "/stkitemsmoddisp/?StkItems=" +
      state.StkItems +
      "&StkItemsGrupo=" +
      state.StkItemsGrupo +
      "&StkItemsRubro=" +
      state.StkItemsRubro; //'http://localhost:3000/data'
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ total: Number(state.total) })
      .send({ StkItemsCantDisp: state.StkItemsCantDisp })
      .then((res) => {
        // const total1 = JSON.parse(res.text)
        //this.setState({marcaver:true})
      });

    if (state.total > 0) {
      const url1 = IpServidor + "/stkmovvtaagregar";
      request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ StkMovVtaCantidad: state.total })
        .send({ StkMovVtaItem: state.StkItems })
        .send({ StkMovVtaGrupo: state.StkItemsGrupo })
        .send({ StkMovVtaRubro: state.StkItemsRubro })
        .then(function (res) {
          // res.body, res.headers, res.status
        });
    }
  };

  return (
    <div>
      <StkMovSalidaContext.Provider
        value={{
          state: state,
          setState: setState,
        }}
      >
        {/* <Grid container>
        <Grid item xs={6} sm={6} lg={6}></Grid>
        Salidas de stock por Confección en Venta ESTE ES EL ACTUAL!!!!!
        <Grid item xs={6} sm={6} lg={6}></Grid>
      </Grid> */}
        <Grid container spacing={32}>
          {/* <Grid item xs={6} sm={6} lg={6}>
          <TextField
            id="StkItemsGrupo"
            select
            label="Grupo"
            fullWidth
            value={state.StkItemsGrupo}
            onChange={handleChangeGrupo("StkItemsGrupo")}
            SelectProps={{
              native: true,
            }}
          >
            <option></option>
            {state.stkgrupo.map((option) => (
              <option key={option.idStkGrupo} value={option.idStkGrupo}>
                {option.StkGrupoDesc}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            id="StkItemsRubro"
            select
            label="Rubro"
            fullWidth
            value={state.StkItemsRubro}
            onChange={handleChangeRubro("StkItemsRubro")}
            SelectProps={{
              native: true,
            }}
            autoFocus={true}
          >
            <option></option>
            {state.stkrubro.map((option) => (
              <option key={option.idStkRubro} value={option.idStkRubro}>
                {option.StkRubroDesc}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            id="StkItems"
            select
            label="Items"
            fullWidth
            value={state.StkItems}
            onChange={handleChangeItems("StkItems")}
            SelectProps={{
              native: true,
            }}
            autoFocus={true}
          >
            <option></option>
            {state.stkitems.map((option) => (
              <option key={option.idStkItems} value={option.idStkItems}>
                {option.StkItemsDesc}
              </option>
            ))}
          </TextField>
        </Grid>
        {state.StkItemsCantDisp < state.StkItemsMin ? (
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="CantDisp"
              label="Cantidad Disponible"
              value={state.StkItemsCantDisp}
              style={{ background: "#f92c19" }}
              disabled
            ></TextField>
          </Grid>
        ) : (
          <Grid item xs={6} sm={6} lg={6}>
            <TextField
              id="CantDisp"
              label="Cantidad Disponible"
              value={state.StkItemsCantDisp}
              style={{ background: "#00e676" }}
              disabled
            ></TextField>
          </Grid>
        )}
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            id="MinStock"
            label="Mínimo Stock"
            value={state.StkItemsMin}
            disabled
          ></TextField>
        </Grid>
        <Grid item xs={6} sm={6} lg={6}>
          <TextField
            id="MaxStock"
            label="Máximo Stock"
            value={state.StkItemsMax}
            disabled
          ></TextField>
        </Grid> */}
          <FilaDos />
          <FilaTres /> {/* Cantida / Largo / Ancho / Tipo de Confección */}[{" "}
          <FilaCinco />
          {/* {!state.marcaver ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={verificadisp}
              >
                Confirmar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </div>
          ) : ( */}
          {/* [ */}
          {/* state.faltante > 0 ? ( */}
          {/* <div>
                  ATENCION NO ALCANZA EL STOCK */}
          {/* <label color="secondary"> ATENCION NO ALCANZA EL STOCK </label> */}
          {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={descargastock}
                  >
                    Verificado
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button> */}
          {/* </div> */}
          {/* ) : ( */}
          {/* <div> */}
          {/* <label>DESCARGO EXITOSAMENTE</label> */}
          {/* {descargastock()} */}
          {/* {this.handleClose()} */}
          {/* </div> */}
          {/* ), */}
          {/* ] */}
          {/* )} */}
        </Grid>
      </StkMovSalidaContext.Provider>
    </div>
  );
}

export default StkMovSalida;
