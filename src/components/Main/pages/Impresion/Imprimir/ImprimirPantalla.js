import printJS from "print-js";

export default function(props) {
  printJS({
    maxWidth: 800,
    properties: props.properties,
    scanStyles: false,
    printable: props.datos,
    type: "json",
    // onPrintDialogClose: () => props.handleClose(),
  });
}
