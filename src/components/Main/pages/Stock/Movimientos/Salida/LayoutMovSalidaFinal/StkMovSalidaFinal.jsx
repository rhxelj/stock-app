import React, { useState } from "react";
// import { withStyles } from '@material-ui/core/styles';

import { initial_state } from "./Initial_State";

// import useStyles from './StkMovSalidaStyle'
import StkSalidaFinal from './StkSalidaFinal'
import {
    Container,
    // Dialog,
    Grid,
    // Paper,
} from "@material-ui/core";


export const StkMovSalidaFinalContext = React.createContext();


var StkMovSalidaFinal = () => {
    const [state, setState] = useState(initial_state);
    // const classes = useStyles();

    return (
        <div>
            <Container>
                <Grid container spacing={6}>
                    <StkMovSalidaFinalContext.Provider
                        value={{
                            state: state,
                            setState: setState
                        }}
                    >
                        {/* Botones de elección de presupuesto */}
                        <StkSalidaFinal />

                    </StkMovSalidaFinalContext.Provider>
                </Grid>
            </Container>
        </div>
    );
}
export default StkMovSalidaFinal;