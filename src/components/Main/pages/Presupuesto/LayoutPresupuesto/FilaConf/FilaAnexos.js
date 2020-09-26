import React, { useState, useEffect } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

// npm install @unicef/material-ui-currency-textfield --save para darle formato pesos en los textfield
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import FormLabel from "@material-ui/core/FormLabel";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  DialogContentText,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import Slide from '@material-ui/core/Slide';
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"
import { presupcalculador } from "../../PresupCalculador";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilaAnexos(props) {
  const { state, setState } = useContext(PresupPantContext);

  const [importea, setImportea] = useState(0)
  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
    if (id === "AnexoEleg") {
      setState({ ...state, PresupTipo: event.target.value });
      //calcular(presuptipo)
    }

  };

  async function calcular() {
    const datosrenglon1 = await presupcalculador(
      "", "",
      state.PresupTipo
    );
    var medida = state.AnexoMedida
    var impunidad = datosrenglon1[0].ImpItem
    var importeanexoeleg = impunidad * medida

    setImportea(importeanexoeleg)

    var StkRubroDesc = "";
    var ImpItem = 0;

    var datospresup = [
      {
        StkRubroDesc: state.PresupTipo,
        ImpItemAnexo: importeanexoeleg,
      },
    ];

    setState({ ...state, renglonanexo: datospresup[0] });
  };




  const classes = useStyles();

  async function conftipoleer(anexo) {
    const result = await leePresupConfTipoLeeAnexo(anexo);
    setState({ ...state, tipoanexo: result });
  }


  useEffect(() => {
    if (state.tipoanexo.length === 0) {
      var anexo = 'S'
      conftipoleer(anexo);
    }
  }, [state.tipoanexo]);

  const textdata = [
    {
      id: "AnexoEleg",
      label: "Anexos",
      value: state.idPresupConfTipo,
      mapeo: (
        <>
          <option></option>
          {state.tipoanexo.map((option) => (
            <option key={option.idPresupConfTipo} value={option.idPresupConfTipo}>
              {option.PresupConfTipoDesc}
            </option>
          ))}
        </>
      ),
    },
  ];
  return (
    <>

      {/* <Grid container item direction="column" spacing={3} xs={2}> */}
      {/* <Grid container xs={12}> */}
      {/* <Grid container direction="row"> */}
      {/* <Grid item spacing={3} xs={12}> */}

      <Grid spacing={3} item xs={2}>
        {/* <Grid item spacing={3} xs> */}
        {textdata.map((data) => (
          <TextField
            id={data.id}
            size="small"
            select
            label={data.label}
            fullWidth
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
            disabled={props.disable}
          >
            {data.mapeo}
          </TextField>
        ))}
      </Grid>
      <Grid spacing={3} item xs={2}>
        <TextField
          // disabled={props.disable}
          inputProps={{ maxlength: 3 }}
          size="small"
          variant="outlined"
          id="AnexoMedida"
          type="number"
          label="Medida"
          fullWidth
          value={state.AnexoMedida}
          onChange={handleChange}
          disabled={props.disable}
        //         className={classes.textField}
        />
      </Grid>
      <Grid spacing={3} item xs={2}>
        <CurrencyTextField
          label="Importe"
          size="small"
          variant="outlined"
          value={importea}
          currencySymbol="$"
          outputFormat="string"
          //     onChange={(event, importea) => setImportea(importea)}
          onChange={handleChange}
          disabled
        />
        {/* <TextField
          // disabled={props.disable}
          inputProps={{ maxlength: 3 }}
          size="small"
          variant="outlined"
          id="AnexoImporte"
          type="currency"
          label="Importe"
          fullWidth
          value={importea}
          onChange={handleChange}
          disabled
        //         className={classes.textField} */}
      </Grid>
      {/* </Grid> */}
      <Grid spacing={3} item xs={2}>
        <Button onClick={calcular} color="secondary" disabled={props.disable} >
          Aceptar Anexo
  </Button>
      </Grid>
    </>
  );
}
