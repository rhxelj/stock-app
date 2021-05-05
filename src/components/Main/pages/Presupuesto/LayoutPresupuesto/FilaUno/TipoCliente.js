import React from "react";
import Radio from "@material-ui/core/Radio";
import {

  Grid,

} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

// import Radio from '@material-ui/core/Radio';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TipoCliente() {
  const [selectedValue, setSelectedValue] = React.useState("mn");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupMnMy: event.target.value });
  };
  return (
    <>

      <RadioGroup
        row
        size="small"
        // label="Tipo de Cliente"
        // aria-label="Tipo de Cliente"    
        name="tipoCliente"
        value={selectedValue}
        onChange={handleChange}
        margin="dense"
      >
        <Grid item xs={3}>
          <FormControlLabel
            value="mn"
            control={<Radio />}
            label="Min."
            labelPlacement="top"
            margin="dense"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            value="my"
            control={<Radio />}
            label="May."
            labelPlacement="top"
            margin="dense"
          />
        </Grid>
      </RadioGroup>
      {/* </FormControl> */}
      {/* <Grid container direction="column" xs={6}>
        <Grid item spacing={3} xs={2}>
          <Radio
            checked={selectedValue === "mn"}
            onChange={handleChange}
            value="mn"
            name="radio-button-mnmy"
          />
          Minorista
        </Grid>
        <Grid item spacing={3} xs={2}>
          <Radio
            checked={selectedValue === "my"}
            onChange={handleChange}
            value="my"
            name="radio-button-mnmy"
          />
          Mayorista
        </Grid>*/}
      {/* </Grid> */}
    </>
  );
}
