import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "react-bootstrap";

export default function botones(props) {
  return (
    <>
      <Button size="sm" variant="outline-primary" onClick={props.editar}>
        <EditIcon />
      </Button>
      <Button size="sm" variant="outline-danger" onClick={props.eliminar}>
        <DeleteIcon />
      </Button>
    </>
  );
}