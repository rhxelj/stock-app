var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../conexion");

'/home/rogelio/Projects/Orlando Lonas/OlsaSG/backend/node_modules/pdfmake/src/printer'"

var pdfmake = require('../../node_modules/pdfmake/src/printer)
// var pdfmake = require("/home/rogelio/Projects/Orlando Lonas/OlsaSG/ backend/node_modules/pdfmake");
var pdfmake = require("../../node_modules/pdfmake");

// var Roboto = require('../../node_modules/pdfmake/fonts/Roboto');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en imppresup");
  } else {
    console.log("no se conecto en imppresup");
  }
});

var router = express();

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

router.post("/", function (req, res, next) {
  var datospresup = req.body.datospresup;

  var rows = [];
  var encabcolum = [];
  var i = 0;
  rows.push([
    { text: "Cant", style: "header" },
    { text: "Descripción", style: "header" },
    { text: "Largo", style: "header" },
    { text: "Ancho", style: "header" },
    { text: "Imp. Unit.", style: "header" },
    { text: "Imp. Item.", style: "header" },
  ]);

  datospresup.map((reng) => {
    if (reng.ImpItemCAnexos == 0) {
      importeItem = reng.ImpItem;
    } else {
      importeItem = reng.ImpItemCAnexos;
    }

    var Cantidad = {
      text: reng.PresupCantidad.toString(),
      style: "tableDatosD",
    };
    var Descripcion = { text: reng.StkRubroDesc, style: "tableDatosI" };
    var Largo = { text: reng.PresupLargo.toString(), style: "tableDatosD" };
    var Ancho = { text: reng.PresupAncho.toString(), style: "tableDatosD" };
    var ImpUnit = {
      text: formatter.format(reng.ImpUnitario).toString(),
      style: "tableDatosD",
    };
    var ImpItem = {
      text: formatter.format(importeItem).toString(),
      style: "tableDatosD",
    };
    rows.push([Cantidad, Descripcion, Largo, Ancho, ImpUnit, ImpItem]);
  });
  pdfmake.addFonts;
  var chartLines = [];
  var chartText = [];
  var chart = [{ stack: chartText }, { canvas: chartLines }];
  var height = 130;
  var yAxisWidth = 30;
  var xAxisHeight = 30;
  var tickSize = 5;
  var left = 10;
  var width = 480;
  var top = 30;
  var fonts = {
    Roboto: {
      normal: "../backend/node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf",
      bold: "../backend/node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf",
      italics: "../backend/node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf",
      bolditalics:
        "../backend/node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
  };
  var PdfPrinter = require("../../node_modules/pdfmake/src/printer");
  var printer = new PdfPrinter(fonts);
  var fs = require("fs");
  // chartLines.push(horizontalLine(left, top, width));
  var docDefinition = {
    pageMargins: [40, 100, 40, 40],
    header: {
      margin: 10,
      text: "Presupuesto",
      style: "header",
      columns: [
        {
          image:"../../routes/impresion/encab.png",
          width: 490,
          height: 80,
        },
      ],
    },

    // header:
    // {
    //     // image: '/home/sandra/SistOLSA/OlsaSG/backend/routes/impresion/encab.png',
    //     // width: 490,
    //     // height: 50,
    //     // absolutePosition: { x: 100, y: 100 }

    //     text:
    //         { text: 'Presupuesto', style: 'header' },

    // },

    content: [
      // {
      //     columns: [
      //         { text: 'Cant' },
      //         { text: 'Descripción' },
      //         { text: 'Largo' },
      //         { text: 'Ancho' },
      //         { text: 'Imp. Unit.' },
      //         { text: 'Imp. Item.' },
      //     ]

      // },
      // {
      //     style: 'tableEncabColumn',

      //     table: {
      //         headerRows: 1, alignment: 'center',
      //         widths: [25, 200, '*', '*', 70, 70],
      //         italics: true,

      //         body: encabcolum,
      //     }
      // },
      {
        style: "tableDatos",
        table: {
          headerRows: 1,
          widths: [25, 200, "*", "*", 70, 70],
          // italics: true,

          body: rows,
        },
      },

      // footer: {
      //     columns: [
      //         'Left part',
      //         { text: 'Right part', alignment: 'right' }
      //     ]
      // },
    ],
    styles: {
      header: {
        fontSize: 12,
        italics: true,
        alignment: "center",
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
      tableEncabColumn: {
        margin: [0, 0, 0, 0],
        //  alignment: 'right',
        alignment: "center",
        bold: true,
      },
      tableDatos: {
        margin: [0, 0, 0, 0],
        //  alignment: 'right',
        alignment: "center",
      },
      tableDatosI: {
        margin: [0, 0, 0, 15],
        alignment: "left",
      },
      tableDatosD: {
        margin: [0, 0, 0, 15],
        alignment: "right",
      },
    },
  };
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(
    fs.createWriteStream(
    //   "/home/sandra/SistOLSA/OlsaSG/backend/routes/impresion/basics.pdf"
      "../../routes/impresion/basics.pdf"
    )
  );
  pdfDoc.end();
});
conexion.end;
module.exports = router;

function horizontalLine(x, y, length) {
  return { type: "line", x1: x, y1: y, x2: x + length, y2: y };
}

function verticalLine(x, y, height) {
  return { type: "line", x1: x, y1: y, x2: x, y2: y + height };
}
