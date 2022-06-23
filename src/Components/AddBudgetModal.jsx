import { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets } from "./Context/BudgetContext";

const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudgets } = useBudgets();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudgets({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value)
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              min={0}
              step={1}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="dark" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
