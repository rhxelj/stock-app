import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        // background: "red",
        border: 0,
        borderRadius: 3,
        // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px"
    },
    //*  cuerpo: { padding: theme.spacing(5) },
    cuerpo: { padding: "10px" },
    cajas: {
        marginLeft: "4px",
        marginRight: "4px"
        // width: auto
    },
    textField_20: {
        width: 5
    },
    textField_60: {
        width: 60
    },
    textField_80: {
        width: 80
    },
    textField_150: {
        width: 150
    },
    textField_370: {
        width: 370
    },
    derecha: {
        background: "red"
    },
    izquierda: {
        background: "blue"
    }
}));

export default useStyles;
