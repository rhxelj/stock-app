import React, { Fragment, useState, useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { TextField, Button } from "@material-ui/core";

import { stkrubroleedesc } from "../../../Stock/Rubros/StkRubroLeeDesc";
import { presupcalculador } from "../../PresupCalculador";
import { presupgrabar } from "../../PresupGrabar";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import FilaTres from "../FilaTres/FilaTres";
import FilaConf from "../FilaConf/FilaConf";

export default function FilaDos(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  const [datosrenglon, setDatosRenglon] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState({
    ConSoga: false,
    SinSoga: false,
  });

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkrubroleerdesc(codgrupo) {
    const result = await stkrubroleedesc(codgrupo);
    setState({ ...state, stkrubro: result });
  }

  useEffect(() => {
    //en el backend pregunta por código de grupo en tabla rubro menor que
    if (state.PresupTipo === "un") {
      stkrubroleerdesc(99);
    } else {
      stkrubroleerdesc(2);
    }
  }, [state.PresupTipo]);

  async function agregar() {
    var dcalculo = [
      {
        StkRubroAbr: state.StkRubroAbr,
        minmay: state.PresupMnMy,
        cantidad: state.PresupCantidad,
        largo: state.PresupLargo,
        ancho: state.PresupAncho,
        tipoconf: state.PresupCsSs,
      },
    ];
    var detalle = "";
    var PresupLargo = 0;
    var PresupAncho = 0;
    var PresupCantidad = 0;
    var PresupCantidadM = state.PresupCantidad;

    if (state.PresupTipo == "pu") {
      detalle = "Paños Unidos en : ";
      PresupLargo = state.PresupLargo;
      PresupCantidadM = 1;
    }
    if (state.PresupTipo == "fa") {
      detalle = "Lona con fajas en el perímetro en : ";
      PresupLargo = state.PresupLargo;
      PresupAncho = state.PresupAncho;
    }
    if (state.PresupTipo == "cf") {
      if (state.PresupCsSs == "cs") {
        detalle =
          "Lona con ojales reforzados, chicotes y soga en dobladillo en : ";
      } else {
        detalle =
          "Lona con ojales reforzados, chicotes sin soga en dobladillo en: ";
      }
      PresupLargo = state.PresupLargo;
      PresupAncho = state.PresupAncho;
    }
    if (state.PresupTipo == "en") {
      PresupLargo = state.PresupLargo;
      PresupAncho = state.PresupAncho;
    }

    var datoscalculos = JSON.stringify(dcalculo);

    const datosrenglon1 = await presupcalculador(
      datoscalculos,
      state.PresupTipo
    );
    console.log("datosrenglon1  ", datosrenglon1);
    var datospresup = [
      {
        PresupCantidad: state.PresupCantidad,
        StkRubroDesc: detalle + datosrenglon1[0][0].StkRubroDesc,
        PresupLargo,
        PresupAncho,
        ImpUnitario: datosrenglon1[0][0].ImpItem,
        ImpItem: datosrenglon1[0][0].ImpItem * PresupCantidadM,
      },
    ];

    //  setDatosRenglon([...datosrenglon, datosrenglon1[0]])
    setDatosRenglon([...datosrenglon, datospresup[0]]);
    // const presupuestog = await presupgrabar(datosrenglon1);
    //console.log(presupuestog)
    console.log("datosrenglon1[0][0]  ", datosrenglon1[0][0]);
    console.log("datospresup[0]  ", datospresup[0]);
    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const textdata = [
    {
      id: "StkRubroAbr",
      label: "Rubro",
      value: state.StkRubroAbr,
      mapeo: (
        <>
          <option></option>
          {state.stkrubro.map((option) => (
            <option key={option.StkRubroAbr} value={option.StkRubroAbr}>
              {option.StkRubroDesc}
            </option>
          ))}
        </>
      ),
    },
  ];

  return (
    <>
      <Grid
        container
        justify="space-around"
        direction="row"
        spacing={3}
        xs={12}
      >
        {textdata.map((data) => (
          <Grid>
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
            >
              {data.mapeo}
            </TextField>
          </Grid>
        ))}
        <Grid item xs>
          <TextField
            inputProps={{ maxlength: 5 }}
            size="small"
            variant="outlined"
            id="PresupCantidad"
            type="number"
            label="Cantidad"
            defaultValue="1"
            fullWidth
            value={state.PresupCantidad}
            onChange={handleChange}
            className={classes.textField}
            onKeyPress={(event) => {
              if (event.key === "Enter")
                document.getElementById("idStkRubro").focus();
            }}
          />
        </Grid>
        {/* {state.PresupTipo !== "un" && ( */}
        <Grid item xs>
          <TextField
            disabled={!(state.PresupTipo !== "un")}
            inputProps={{ maxlength: 3 }}
            size="small"
            variant="outlined"
            id="PresupLargo"
            type="number"
            label="Largo"
            fullWidth
            value={state.PresupLargo}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>
        {/* )} */}
        {/* {state.PresupTipo !== "un" && state.PresupTipo !== "pu" && ( */}
        <Grid item xs>
          <TextField
            disabled={!(state.PresupTipo !== "un" && state.PresupTipo !== "pu")}
            inputProps={{ maxlength: 3 }}
            size="small"
            variant="outlined"
            id="PresupAncho"
            type="number"
            label="Ancho"
            fullWidth
            value={state.PresupAncho}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>
        {/* )} */}
        {/* {state.PresupTipo === "cf" && ( */}
        <Grid item xs>
          <FilaConf disable={!(state.PresupTipo === "cf")}></FilaConf>{" "}
          {/* siempre visible pero solo lo habilito cuando se cumple la condicion */}
        </Grid>
        {/* ) } */}
        <Button onClick={() => agregar()} color="primary">
          Agregar
        </Button>
      </Grid>
      <FilaTres
        open={open}
        handleClose={handleClose}
        data={datosrenglon}
        maymin={state.PresupMnMy}
      />
      {/* <FilaTres></FilaTres> */}
    </>
  );
}
