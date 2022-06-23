import { useContext, createContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "./useLocalStorage";

const BudgetContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetsID) {
    return expenses.filter((expenses) => expenses.budgetID === budgetsID);
  }

  function addExpenses({ description, amount, budgetID }) {
    setExpenses((previousExpenses) => {
      return [
        ...previousExpenses,
        { ID: uuidV4(), description, amount, budgetID }
      ];
    });
  }

  function addBudgets({ name, max }) {
    setBudgets((previousBudgets) => {
      if (previousBudgets.find((budgets) => budgets.name === name)) {
        return previousBudgets;
      }
      return [...previousBudgets, { ID: uuidV4(), name, max }];
    });
  }

  function delBudgets({ ID }) {
    setExpenses((previousExpenses) => {
      return previousExpenses.map((expense) => {
        if (expense.budgetID !== ID) {
          return expense;
        }
        return { ...expense, budgetID: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((previousBudgets) => {
      return previousBudgets.filter((budgets) => budgets.ID !== ID);
    });
  }

  function delExpenses({ ID }) {
    setExpenses((previousExpenses) => {
      return previousExpenses.filter((expenses) => expenses.ID !== ID);
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudgets,
        delBudgets,
        delExpenses
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
