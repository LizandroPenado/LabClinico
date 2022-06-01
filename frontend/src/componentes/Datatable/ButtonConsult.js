import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function botonesConsult(props) {
  return (
    <>
      <Button size="sm" variant="outline-primary">
        <Link to={props.consultar}> <VisibilityIcon /> </Link>
      </Button>
      <Button size="sm" variant="outline-danger" onClick={props.eliminar}>
        <DeleteIcon />
      </Button>
    </>
  );
}