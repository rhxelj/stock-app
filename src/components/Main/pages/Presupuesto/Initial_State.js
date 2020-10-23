export const initial_state = {
  //Funcions agregaStock BEGIN ***//

  //FilaUno
  PresupMnMy: "mn",
  PresupCsSs: "cs",

  //FilaDos
  AnexoMedida: 0,
  PresupCantidad: 1.0,
  PresupTipo: '',
  ImporteAnexo: 0.0,
  renglonanexo: [],
  DetalleAnexo: '',
  stkrubro: [],
  clientes: [],
  PresupLargo: 0.0,
  PresupAncho: 0.0,
  AnexoLargo: 0.0,
  StkRubroAbr: "",
  idClientes: 0,
  PresupConfTipoDesc: "",
  LabelMed: "",
  DatosPresupEleg: [],
  tipoanexo: [],
  tipopresup: [
    // {
    //   tipopresupabr: 'un',
    //   tipopresupdet: 'Por Unidad',
    // },
    // {
    //   tipopresupabr: 'pu',
    //   tipopresupdet: 'Paño Unido',
    // },
    // {
    //   tipopresupabr: 'fa',
    //   tipopresupdet: 'Con Fajas',
    // },
    // {
    //   tipopresupabr: 'cf',
    //   tipopresupdet: 'Confeccionada',
    // },
    // {
    //   tipopresupabr: 'en',
    //   tipopresupdet: 'Enrollable',
    // }
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
      type: "currency",
    },
    {
      title: "Imp. Item.",
      field: "ImpItem",
      type: "currency",

    },
    {
      title: "$ Item c/Anexos",
      field: "ImpItemCAnexos",
      type: 'currency',
    }
  ],


  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: "",
  cantidad: 1.0,
  // StkRubroPres: null,

  disponibilidad: 0,
  //Funcions agregaStock END ***//

  stkgrupo: [],

  stkitems: [],

  //F2C2
  stkitemsele: [],

  //FilaTres
  StkItemsFAct: "",
  StkRubroPres: "",
  StkRubroPresDes: "",
  StkRubroUM: "",
  StkRubroAncho: 0,

  //FilaCuatro
  nomCliente: "",
};
