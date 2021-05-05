import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
// import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./StkMovEntradaStyle";
import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import StkGenImpQR from "../../Impresion/StkGenImpQR";
import ubicacion from "./UbicacionGeografica";
import { stkgrupolee } from "../../Stock/Grupos/StkGrupoLee";
import { stkrubroleecodgrupo } from "../../Stock/Rubros/StkRubroLeeCodGrupo";
import { stkitemsleecodgryrb } from "../../Stock/Items/StkItemsLeeCodGryRb";
import { stkitemsleecodgrrbit } from "../../Stock/Items/StkItemsLeeCodGrRbIt";
import StkMovEntradaDatItems from "./StkMovEntradaDatItems";

var initial_state = {
  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: "",
  dialogo_imprimir: false,
  stkrubro: [],
  stkgrupo: [],
  stkitems: [],
  stkenvaseubg: [],
  ubicacionf: [],
  stkrubroele: [],
  // StkItemsGrupo: 0,
  StkItemsCantidad: 0.0,
  StkItemsCantDisp: 0.0,
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkRubroAncho: null,
  StkRubroPresDes: null,
  StkRubroPres: null,
  StkRubroUM: null,
  cantidad: 1.0,
  largo: 0.0,
  ancho: 0.0,
  faltante: 0.0,
  total: 0.0,
  datostraid: [],
  open: true,
  toggle_imprimir: false,
  marcagenqr: false,
  imp_conf: false,
  marcaagregado: false,
  StkEnvaseUb: "",
  StkEnvaseObserv: "",
  StkEnvasePartida: "",
  toggle_state: {
    entrada: true,
    dialogo: false, //TODO antiguamente dialogo borrar una vez que funcione
    imprimir: false
  }
};

var StkMovEntrada = props => {
  var [state, setState] = useState(initial_state);
  // Lee Grupo
  async function stkgrupoleer() {
    const result = await stkgrupolee();
    setState({ ...state, stkgrupo: result });
  }

  async function stkrubroleercodgrupo(codigogrupo) {
    const result = await stkrubroleecodgrupo(codigogrupo);
    setState({ ...state, stkrubro: result });
  }

  async function stkitemsleercodgryrb(codigogrupo, codigorubro) {
    const result = await stkitemsleecodgryrb(codigogrupo, codigorubro);
    setState({ ...state, stkitems: result });
  }

  useEffect(() => {
    stkgrupoleer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    stkrubroleercodgrupo(state.idStkGrupoEle); //leo rubros apartir del grupo seleccionado
  }, [state.idStkGrupoEle]);

  useEffect(() => {
    stkitemsleercodgryrb(state.idStkGrupoEle, state.idStkRubroEle); //leo rubros apartir del grupo seleccionado
  }, [state.idStkRubroEle]);

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const classes = useStyles();
  return (
    <div>
      {/* {state.toggle_state.entrada && ( // toggle_imprimir = FALSE */}
      <TextField
        className={classes.cajas}
        id="idStkGrupoEle"
        label="Grupo"
        variant="outlined"
        select
        value={state.idStkGrupoEle}
        onChange={handleChange("idStkGrupoEle")}
        SelectProps={{ native: true }}
        className={classes.textField_150}
      >
        <option></option>
        {state.stkgrupo.map(option => (
          <option key={option.idStkGrupo} value={option.idStkGrupo}>
            {option.StkGrupoDesc}
          </option>
        ))}
      </TextField>

      <TextField
        className={classes.cajas}
        id="idStkRubroEle"
        variant="outlined"
        select
        label="Rubro"
        value={state.idStkRubroEle}
        onChange={handleChange("idStkRubroEle")}
        SelectProps={{
          native: true
        }}
        autoFocus={true}
        className={classes.textField_220}
      >
        <option></option>
        {state.stkrubro.map(option => (
          <option key={option.idStkRubro} value={option.idStkRubro}>
            {option.StkRubroDesc}
          </option>
        ))}
      </TextField>

      <TextField
        className={classes.cajas}
        id="idStkItemsEle"
        variant="outlined"
        select
        label="Items"
        value={state.idStkItemsEle}
        onChange={handleChange("idStkItemsEle")}
        SelectProps={{
          native: true
        }}
        autoFocus={true}
        className={classes.textField_150}
      >
        <option></option>
        {state.stkitems.map(option => (
          <option key={option.idStkItems} value={option.idStkItems}>
            {option.StkItemsDesc}
          </option>
        ))}
      </TextField>
      {!!state.idStkItemsEle && (
        <StkMovEntradaDatItems
          GrupoEleg={state.idStkGrupoEle}
          RubroEleg={state.idStkRubroEle}
          ItemEleg={state.idStkItemsEle}
        ></StkMovEntradaDatItems>
      )}
    </div>
  );
};
export default StkMovEntrada;
