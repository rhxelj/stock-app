import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

import { TextField, Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { stkrubroleedesc } from "../../../Stock/Rubros/StkRubroLeeDesc";
import { presupcalculador } from "../../PresupCalculador";
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import {
  red,
  blue,
  green,
  blueGrey,
  purple,
  teal,
} from "@material-ui/core/colors";
// import { presupgrabar } from "../../PresupGrabar";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import TablaPresup from "../TablaPresup/TablaPresup";
import FilaConf from "../FilaConf/FilaConf";

export default function FilaDos(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  // const [datosrenglon, setDatosRenglon] = useState([]);
  const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);
  const [open, setOpen] = useState(false);

  // según el presupuesto elegido, lee la tabla y se decide que pide
  if (state.DatosPresupEleg.length != 0) {
    var largo = state.DatosPresupEleg[0].PresupConfTipoLargo;
    var ancho = state.DatosPresupEleg[0].PresupConfTipoAncho;
    var presuptipo = state.DatosPresupEleg[0].PresupConfTipoDesc;
    if (state.DatosPresupEleg[0].PresupConfTipoRubro === "VS") {
      var rubrosn = "S";
    } else {
      var rubrosn = "N";
    }
  }

  // const [check, setCheck] = React.useState({
  //   ConSoga: false,
  //   SinSoga: false,
  // });

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkrubroleerdesc(codgrupo) {
    const result = await stkrubroleedesc(codgrupo);
    setState({ ...state, stkrubro: result });
  }
  useEffect(() => {
    if (presuptipo === "UNIDAD") {
      stkrubroleerdesc(99);
    } else {
      stkrubroleerdesc(2);
    }
  }, [rubrosn]);



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
    //var detalle = "";
    var StkRubroDesc = "";
    var PresupLargo = 0;
    var PresupAncho = 0;
    var PresupCantidad = 0;
    var ImpUnitario = 0;
    var ImpItem = 0;
    var ImpItemCAnexos = 0;
    var PresupCantidadM = state.PresupCantidad;
    var detalle = presuptipo;

    var datoscalculos = JSON.stringify(dcalculo);
    const datosrenglon1 = await presupcalculador(
      state.DatosPresupEleg[0],
      datoscalculos,
      presuptipo
    );
    if (rubrosn === "S") {
      StkRubroDesc =
        datosrenglon1[0][0].Detalle +
        datosrenglon1[0][0].StkRubroDesc +
        " " +
        state.DescripPresup;
      ImpUnitario = datosrenglon1[0][0].ImpItem;
      ImpItem = datosrenglon1[0][0].ImpItem * PresupCantidadM;
      PresupLargo = datosrenglon1[0][0].Largo;
      PresupAncho = datosrenglon1[0][0].Ancho;
      if (state.renglonanexo.length !== 0) {
        ImpItemCAnexos =
          ImpItem + state.renglonanexo.ImpItemAnexo * state.PresupCantidad;
        StkRubroDesc = StkRubroDesc + state.renglonanexo.StkRubroDesc;
      }
    } else {
      StkRubroDesc = detalle;
      ImpUnitario = datosrenglon1[0].ImpItem;
      ImpItem = datosrenglon1[0].ImpItem * PresupCantidadM;
    }
    var datospresup = [
      {
        PresupCantidad: state.PresupCantidad,
        StkRubroDesc,
        PresupLargo,
        PresupAncho,
        ImpUnitario,
        ImpItem,
        ImpItemCAnexos,
      },
    ];

    if (state.renglonanexo.length !== 0) {
      setDatosRenglon([...datosrenglon, state.renglonanexo]);
      setDatosRenglon([...datosrenglon, datospresup[0]]);
    } else {
      setDatosRenglon([...datosrenglon, datospresup[0]]);
    }
    console.log("DatosRenglon -> ", datosrenglon);
    console.log("DatosRenglon1 -> ", datosrenglon1);

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
      {rubrosn === "S" &&
        state.stkrubro.length > 0 &&
        textdata.map((data, index) => (
          <Grid key={index} item xs={1}>
            <TextField
              id={data.id}
              size="small"
              select
              label={data.label}
              // fullWidth
              value={data.value}
              onChange={handleChange}
              SelectProps={{ native: true }}
              variant="outlined"
              margin="dense"
            >
              {data.mapeo}
            </TextField>
          </Grid>
        ))}
      <Grid item xs={1}>
        <TextField
          inputProps={{ maxLength: 5 }}
          size="small"
          variant="outlined"
          id="PresupCantidad"
          type="number"
          label="Cantidad"
          defaultValue="1"
          fullWidth
          margin="dense"
          value={state.PresupCantidad}
          onChange={handleChange}
          className={classes.textField}
          onKeyPress={(event) => {
            if (event.key === "Enter")
              document.getElementById("idStkRubro").focus();
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          disabled={largo === "N"}
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="PresupLargo"
          type="number"
          label="Largo"
          fullWidth
          margin="dense"
          value={state.PresupLargo}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          disabled={ancho === "N"}
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="PresupAncho"
          type="number"
          label="Ancho"
          fullWidth
          margin="dense"
          value={state.PresupAncho}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      {/* <Grid container item spacing > */}
      {/* <Grid item xs={4}> */}
      <Grid item xs>
        <FilaConf disable={!(presuptipo === "CONFECCIONADA")}></FilaConf>
      </Grid>

      <Grid item xs>
        <IconButton onClick={() => agregar()} color="primary" >
          <AssignmentReturnedIcon style={{ color: red[500] }} fontSize='large' titleAccess='Agregar' />
        </IconButton>
        {/* <Button onClick={() => agregar()} color="primary">
          Agregar
        </Button> */}
      </Grid>
      {/* </Grid> */}

      <TablaPresup
        // open={open}
        // handleClose={handleClose}
        data={datosrenglon}
        maymin={state.PresupMnMy}
      />
    </>
  );
}
