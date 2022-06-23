import { Modal, Button, Stack } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./Context/BudgetContext";

const ViewExpenseModal = ({ budgetID, handleClose }) => {
  const { budgets, getBudgetExpenses, delBudgets, delExpenses } = useBudgets();
  const expenses = getBudgetExpenses(budgetID);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetID
      ? { name: "Uncategorized", ID: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.ID === budgetID);

  return (
    <Modal show={budgetID != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <div className="text-capitalize h3">{budget?.name}</div>
            {budgetID !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  delBudgets(budget);
                  handleClose();
                }}
                variant="outline-danger"
                size="sm"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {expenses.map((expense) => {
          return (
            <Stack
              className="mb-1"
              direction="horizontal"
              gap={3}
              key={expense.ID}
            >
              <div className="me-auto fs-5">{expense.description}</div>
              <div className="fs-5">${expense.amount}</div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => delExpenses(expense)}
              >
                &times;
              </Button>
            </Stack>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpenseModal;
