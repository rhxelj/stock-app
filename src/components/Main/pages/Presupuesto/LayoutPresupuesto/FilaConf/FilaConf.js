import React, { useState } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import {
  Box,
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
  Typography,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaConf(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupCsSs: event.target.value });
  };
  const classes = useStyles();
  return (
    <>
      <Grid container xs={12}>
        {/* <Grid container direction="row"> */}
        <Grid item spacing={3} xs={12}>
          <Radio
            checked={selectedValue === "cs"}
            onChange={handleChange}
            value="cs"
            name="radio-button-csss"
            disabled={props.disable}
          />
          Con Soga
        </Grid>
        <Grid item spacing={3} xs={12}>
          <Radio
            checked={selectedValue === "my"}
            onChange={handleChange}
            value="my"
            name="radio-button-csss"
            disabled={props.disable}
          />
          Sin Soga
        </Grid>
      </Grid>
    </>
  );
}
