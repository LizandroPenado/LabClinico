import React from "react";
import MUIDataTable from "mui-datatables";
import { Row, Col } from "react-bootstrap";
import "./Tabla.css";

export default function dataTable(props) {
  const options = {
    download: "false",
    responsive: "vertical",
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
    tableBodyHeight: "100%",
    tableBodyMaxHeight: "100%",
    textLabels: {
      body: {
        noMatch: props.noRegistro,
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Página siguiente",
        previous: "Página previa",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Búsqueda",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtros de tabla",
      },
      filter: {
        all: "TODOS",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas de tabla",
      },
      selectedRows: {
        text: "fila(s) seleccionada",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
  };
  return (
    <>
      <Row>
        <div className="text-center titulo-empresa">{props.empresa}</div>
      </Row>
      <Row>
        <Col className="pt-3">
          <Row>
            <Col align="left">
              <div className="pb-4">{props.regresar}</div>
            </Col>
            <Col align="right">
              <div className="pb-4">{props.agregar}</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <MUIDataTable
            title={props.titulo}
            data={props.datos}
            columns={props.columnas}
            options={options}
          />
        </Col>
      </Row>
    </>
  );
}