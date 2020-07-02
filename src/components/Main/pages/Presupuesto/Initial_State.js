export const initial_state = {
  //Funcions agregaStock BEGIN ***//

  //FilaUno
  PresupTipo: "un",
  PresupMnMy: 'mn',
  PresupCsSs: 'cs',

  //FilaDos
  PresupCantidad: 1.0,
  stkrubro: [],
  clientes: [],
  PresupLargo: 0.0,
  PresupAncho: 0.0,
  StkRubroAbr: '',
  idClientes: 0,
  // datosrenglon : [],

  tipopresup: [
    {
      tipopresupabr: 'un',
      tipopresupdet: 'Por Unidad',
    },
    {
      tipopresupabr: 'pu',
      tipopresupdet: 'Paño Unido',
    },
    {
      tipopresupabr: 'fa',
      tipopresupdet: 'Con Fajas',
    },
    {
      tipopresupabr: 'cf',
      tipopresupdet: 'Confeccionada',
    },
    {
      tipopresupabr: 'en',
      tipopresupdet: 'Enrollable',
    }

  ],
  //FilaTres


  columns: [

    {
      title: "Cantidad",
      field: "PresupCantidad",
    },
    {
      title: "Descripción",
      field: "StkRubroDesc",
    },
    {
      title: "Largo",
      field: "PresupLargo",
    },
    {
      title: "Ancho",
      field: "PresupAncho",
    },
    {
      title: "Imp. Unit.",
      field: "ImpUnitario",
      type: 'currency',
    },
    {
      title: "Imp. Item.",
      field: "ImpItem",
      type: 'currency',
      // },
      // {
      //   title: "StkRubroCosto.",
      //   field: "StkRubroCosto",
      //   type: 'currency',
      // },
      // {
      //   title: "StkMonedasCotizacion.",
      //   field: "StkMonedasCotizacion",
      //   type: 'currency',
    }
  ],
  // data: [
  //   { StkRubroDesc: 'gg', ImpUnitario: 0, ImpItem: 0, StkRubroCosto: 0, StkMonedasCotizacion: 0 },
  //  // { StkRubroDesc: 'Zerya Betül', ImpUnitario: 678, ImpItem: 2017, StkRubroCosto: 34, StkMonedasCotizacion: 63 },
  // ],
  // data: [],


  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: "",
  cantidad: 1.0,
  StkRubroPres: null,


  disponibilidad: 0,
  //Funcions agregaStock END ***//

  stkgrupo: [],

  stkitems: [],

  //F2C2
  stkitemsele: [],

  //FilaTres
  stkitemsele: [],
  StkItemsFAct: "",
  StkRubroPres: "",
  StkRubroPresDes: "",
  StkRubroUM: "",
  StkRubroAncho: 0,
  cantidad: 1,

  //FilaCuatro
  nomCliente: ''
};
