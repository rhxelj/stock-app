import React, { Fragment, useState, useEffect } from "react";

import { initial_state } from "./Initial_State";

import useStyles from "./PresupStyle";
import TablaPresup from './ArmaPresup/TablaPresup'
import {
    Container,
    Dialog,
    Grid,
    Paper,
} from "@material-ui/core";

export const PresupuestosContext = React.createContext();


var Presupuestos = props => {

    const [state, setState] = useState(initial_state);
    const classes = useStyles();



    return (
        <div>

            <Container>
                {/* <Grid item></Grid> */}
                <Grid container spacing={3} alignItems="center">
                    <PresupuestosContext.Provider
                        value={{
                            state: state,
                            setState: setState
                        }}
                    >
                        <Grid item></Grid> {/*  Para dejar espacio  */}
                        <Grid item></Grid> {/*  Para dejar espacio  */}
                        <TablaPresup />

                    </PresupuestosContext.Provider>
                </Grid>
            </Container>
        </div>
    );
}
export default Presupuestos;