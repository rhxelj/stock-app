import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaConf(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupPantContext);
  const [ojalbronce, setOjalBronce] = React.useState('hz');
  // const [DescripPresup, setDescripPresup] = React.useState('')
  // var [DetallePresup, setDetallePresup] = React.useState('')



  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupCsSs: event.target.value });
  };

  const handleChange2 = (event) => {
    setOjalBronce(event.target.value);
    setState({ ...state, PresupOB: event.target.value });
  };

  const handleChange3 = (event) => {
    // setDescripPresup(event.target.value);
    setState({ ...state, DescripPresup: event.target.value });
  };

  const handleChange4 = (event) => {
    setSelectedValue(event.target.value);
    //   setDetallePresup(event.target.value);
    setState({ ...state, DetallePresup: event.target.value });
  };

  const classes = useStyles();



  return (
    <>
      {/* <Grid container item xs={12}> */}
      {/* <Grid container item direction="row" xs={12}> */}
      {/* <Grid item spacing={3} xs={2}> */}
      {/* <Grid container item xs={12}> */}
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoDobladillo"
          value={selectedValue}
          onChange={handleChange}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="cs"
            control={<Radio />}
            label="C/S"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="ss"
            control={<Radio />}
            label="S/S"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
      </Grid>
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoOjal"
          value={ojalbronce}
          onChange={handleChange2}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="hz"
            control={<Radio />}
            label="HZ"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="br"
            control={<Radio />}
            label="BR"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
      </Grid>

      <Grid item xs={3}>
        <TextField
          inputProps={{ maxLength: 12 }}
          size="small"
          variant="outlined"
          id="DescripPresup"
          margin="dense"
          label="Descripción"
          // fullWidth
          value={state.DescripPresup}
          helperText='No imprime medidas'
          onChange={handleChange3}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          inputProps={{ maxLength: 25 }}
          size="small"
          variant="outlined"
          id="DetallePresup"
          margin="dense"
          label="Detalle Presupuesto "
          // fullWidth
          value={state.DetallePresup}
          helperText='Saca la descripción por defecto'
          onChange={handleChange4}
          className={classes.textField}
        />
      </Grid>
    </>
  );
}
