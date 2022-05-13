import React from "react";
import { Modal } from "react-bootstrap";

export default function modalCU(props) {
    return (
        <>
            {/* Modal crear */}
            <Modal backdrop="stactic" centered show={props.abrirInsertar} onHide={props.cerrarInsertar}>
                <Modal.Header>
                    <Modal.Title>
                        <span>Agregar {props.titulo}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.formulario}</Modal.Body>
                <Modal.Footer>{props.pieModalCrear}</Modal.Footer>
            </Modal>

            {/* Modal crear */}
            <Modal backdrop="stactic" centered show={props.abrirAct} onHide={props.cerrarAct}>
                <Modal.Header>
                    <Modal.Title>
                        <span>Actualizar {props.titulo}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.formulario}</Modal.Body>
                <Modal.Footer>{props.pieModalAct}</Modal.Footer>
            </Modal>

            {/* Modal para eliminar */}
            <Modal backdrop="static" centered show={props.abrirEliminar} onHide={props.cerrarEliminar}>
                <Modal.Header>
                    <Modal.Title>
                        <span>Eliminar {props.titulo}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Esta seguro de eliminar el {props.titulo} <span className="text-primary">"{props.usuario}"</span>?
                </Modal.Body>
                <Modal.Footer>{props.pieModalEliminar}</Modal.Footer>
            </Modal>
        </>
    );
}