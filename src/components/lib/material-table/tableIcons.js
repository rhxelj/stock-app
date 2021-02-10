import React, { Component } from "react";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Print from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteForever {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (<ChevronRight {...props} ref={ref} />)),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (<ChevronLeft {...props} ref={ref} />)),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Print: forwardRef((props, ref) => <Print {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <SaveIcon {...props} ref={ref} />),
  SaveAlt: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
  AddShoppingCart: forwardRef((props, ref) => <AddShoppingCartIcon {...props} ref={ref} />),
  NoteAdd: forwardRef((props, ref) => <NoteAddIcon {...props} ref={ref} />),
  Cancel: forwardRef((props, ref) => <CancelIcon {...props} ref={ref} />),
  Attachment: forwardRef((props, ref) => <AttachmentIcon {...props} ref={ref} />),
  AssignmentReturned: forwardRef((props, ref) => <AssignmentReturnedIcon {...props} ref={ref} />),
  Autorenew: forwardRef((props, ref) => <AutorenewIcon {...props} ref={ref} />),
  LibraryAddCheck: forwardRef((props, ref) => <LibraryAddCheckIcon {...props} ref={ref} />),
};
