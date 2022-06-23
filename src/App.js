import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Container, Navbar, Nav, Stack, Button } from "react-bootstrap";

import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import ViewExpenseModal from "./Components/ViewExpenseModal";
import BudgetCard from "./Components/BudgetCards";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Components/Context/BudgetContext";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import './App.css';

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <div className="App">
      <Navbar
        className="shadow-sm mb-3 bg-white rounde"
        bg="light"
        variant="light"
      >
        <Container className="d-flex justify-content-baseline">
          <Navbar.Brand href="#home">
            <h1>Budgets</h1>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Stack className="" direction="horizontal" gap={1}>
              <Button
                className=""
                variant="outline-dark"
                onClick={() => {
                  setShowAddBudgetModal(true);
                }}
              >
                Add Budget
              </Button>
              <Button
                className=""
                variant="outline-dark"
                onClick={openAddExpenseModal}
              >
                Add Expense
              </Button>
            </Stack>
          </Nav>
        </Container>
      </Navbar>
      <Container className="d-md-flex flex-md-wrap justify-content-md-between">
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.ID).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
              key={budget.ID}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.ID)}
              onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.ID)}
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
        <TotalBudgetCard />
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpenseModal
        budgetID={viewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId()}
      />
    </div>
  );
}

export default App;
