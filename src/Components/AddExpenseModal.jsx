import { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./Context/BudgetContext";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpenses, budgets } = useBudgets();
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpenses({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetID: budgetIdRef.current.value
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={1}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgrtId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option ID={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.ID} value={budget.ID}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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

export default AddExpenseModal;
