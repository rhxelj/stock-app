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

export default function TipoIVA() {
  const [selectedValue, setSelectedValue] = React.useState("CIVA");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupIVA: event.target.value });
  };

  return (
    <>
      {console.log('state.PresupMnMy  ', state.PresupMnMy)}
      { state.PresupMnMy === "mn" &&
        <RadioGroup
          row
          size="small"
          // label="Tipo de Cliente"
          // aria-label="Tipo de Cliente"    
          name="tipoIVA"
          value={selectedValue}
          onChange={handleChange}
          margin="dense"
        >
          <Grid item xs={4}>
            <FormControlLabel
              value="CIVA"
              control={<Radio />}
              label="c/IVA"
              labelPlacement="top"
              margin="dense"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              value="SIVA"
              control={<Radio />}
              label="s/IVA"
              labelPlacement="top"
              margin="dense"
            />
          </Grid>
        </RadioGroup>}

    </>
  );
}
