import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

import { TextField } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { stkrubroleeconf } from "../../../Stock/Rubros/StkRubroLeeConf";
import { presupcalculador } from "../../PresupCalculador";


import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import {
  red,
} from "@material-ui/core/colors";
// import { presupgrabar } from "../../PresupGrabar";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import TablaPresup from "../TablaPresup/TablaPresup";
import FilaConf from "../FilaConf/FilaConf";
import FilaEnrollables from "../FilaEnrollables/FilaEnrollables";
import FilaTanques from "../FilaTanques/FilaTanques"



export default function FilaDos() {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  // const [datosrenglon, setDatosRenglon] = useState([]);
  const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);
  const [open, setOpen] = useState(false);
  //  const [setOpen] = useState(false);
  // const [DetallePresup, setDetallePresup] = React.useState('')
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }


  // según el presupuesto elegido, lee la tabla y se decide que pide
  if (state.DatosPresupEleg.length !== 0) {
    var largo = state.DatosPresupEleg[0].PresupConfTipoLargo;
    var ancho = state.DatosPresupEleg[0].PresupConfTipoAncho;
    var presuptipo = state.DatosPresupEleg[0].PresupConfTipoDesc;

    //esto es porque va a ser un cálculo especial, tiene un backend para eso
    var rubrosn = ''
    var labellargo = ''
    if (state.DatosPresupEleg[0].PresupConfTipoRubro === "VS") {
      rubrosn = "S";
    } else {
      rubrosn = "N";
    }
    if (presuptipo === "LONAS ENROLLABLES") {
      labellargo = 'Alto'
    }
    else {
      labellargo = 'Largo'
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

  async function stkrubroleerconf(cuallee) {
    const result = await stkrubroleeconf(cuallee);
    console.log('result   ', result)
    setState({ ...state, stkrubro: result });
  }


  // async function stkrubroleerdesc(codgrupo) {
  //   const result = await stkrubroleedesc(codgrupo);
  //   setState({ ...state, stkrubro: result });
  // }
  useEffect(() => {

    if (presuptipo === "UNIDAD") {
      stkrubroleerconf('T');
    } else {
      stkrubroleerconf('S');
    }
  }, [presuptipo]);


  async function agregar() {
    var dcalculo = [
      {
        StkRubroAbr: state.StkRubroAbr,
        minmay: state.PresupMnMy,
        ivasn: state.PresupIVA,
        cantidad: state.PresupCantidad,
        largo: state.PresupLargo,
        ancho: state.PresupAncho,
        tipoconf: state.PresupCsSs,
        tipoojale: state.PresupOB,
        detallep: state.DetallePresup,
        tamfaja: state.TamFaja,
        tamcristal: state.TamCristal,
        altovolado: state.AltoVolado,
        sobrantemarco: state.SobranteMarco,
        tipomedeleg: state.TipoMedidaEleg,
        termbordeeleg: state.TermBordeEleg,
        anchopared: state.AnchoPared,
        medida: state.Medida,
        alto: state.Alto
      },
    ];
    //var detalle = "";
    var StkRubroDesc = "";
    var PresupLargo = 0;
    var PresupAncho = 0;
    var ImpUnitario = 0;
    var ImpItem = 0;
    var PresupCantidadM = state.PresupCantidad;
    var detalle = presuptipo;
    var datoscalculos = JSON.stringify(dcalculo);
    const datosrenglon1 = await presupcalculador(
      state.DatosPresupEleg[0],
      datoscalculos,
      presuptipo
    );
    //esto es porque va a ser un cálculo especial, tiene un backend para eso

    if (rubrosn === "S") {
      var unidmed = ''
      if (datosrenglon1[0][0].StkRubroUM) {
        unidmed = datosrenglon1[0][0].StkRubroUM + ' '
      }
      StkRubroDesc =
        unidmed +
        datosrenglon1[0][0].Detalle +
        datosrenglon1[0][0].StkRubroDesc;


      if (datosrenglon1[0][0].MDesc === 'S') {
        StkRubroDesc = StkRubroDesc +
          " " + state.DescripPresup
      }

      ImpUnitario = datosrenglon1[0][0].ImpUnitario;
      ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
      PresupLargo = datosrenglon1[0][0].Largo;
      PresupAncho = datosrenglon1[0][0].Ancho;


      if (PresupLargo === 0 || PresupAncho === 0) {
        ImpItem = datosrenglon1[0][0].ImpUnitario;

      }

      if (PresupLargo === 0 && PresupAncho === 0) {
        ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
      }


      if (state.renglonanexo.length !== 0) {
        //ImpItemCAnexos = ImpItem + state.renglonanexo.ImpItemAnexo * state.PresupCantidad;
        ImpUnitario = ImpUnitario * 1 + state.renglonanexo.ImpItemAnexo * 1
        ImpItem = ImpItem + state.renglonanexo.ImpItemAnexo * state.PresupCantidad;
        StkRubroDesc = StkRubroDesc + state.renglonanexo.StkRubroDesc;
      }
    }
    else {

      StkRubroDesc = detalle;
      //ImpUnitario = datosrenglon1[0].ImpUnitario;
      ImpUnitario = datosrenglon1
      //   ImpItem = datosrenglon1[0].ImpUnitario * PresupCantidadM;
      ImpItem = datosrenglon1 * PresupCantidadM;
    }

    var datospresup = [
      {
        PresupCantidad: state.PresupCantidad,
        StkRubroDesc,
        PresupLargo,
        PresupAncho,
        ImpUnitario,
        ImpItem,
        //ImpItemCAnexos,
      },
    ];
    if (state.renglonanexo.length !== 0) {
      setDatosRenglon([...datosrenglon, state.renglonanexo]);
      setDatosRenglon([...datosrenglon, datospresup[0]]);
    } else {
      setDatosRenglon([...datosrenglon, datospresup[0]]);
    }

    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const limpiar = () => {
  //   console.log('esta en limpieza')
  // };

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
        textdata.map((data) => (
          // <Grid key={index} item xs={1}>
          // <Grid key={index} item >
          <TextField
            id={data.id}
            size="small"
            inputProps={{ maxLength: 3 }}
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
          label={labellargo}
          // label="Largo o Alto"
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

      <Grid container item xs={12}>
        {/* < FilaConf disable={!(presuptipo === "CONFECCIONADA")}></FilaConf> */}

        {presuptipo === "CONFECCIONADA" && <FilaConf></FilaConf>}
        {presuptipo === "LONAS ENROLLABLES" && <FilaEnrollables></FilaEnrollables>}
        {presuptipo === "BOLSON PARA TANQUE" && <FilaTanques></FilaTanques>}
        <IconButton onClick={() => agregar()} color="primary" >
          <AssignmentReturnedIcon style={{ color: red[500] }} fontSize='large' titleAccess='Agregar' />
        </IconButton>



      </Grid>

      <TablaPresup
        data={datosrenglon}
      />

    </>
  );
}
