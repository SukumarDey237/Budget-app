import { Stack, Button, Card, ProgressBar } from "react-bootstrap";

export default function BudgetCard(props) {
  let colorAssigner = function (amount, max) {
    const ratio = amount / max;
    if (ratio > 1) return "bg-danger bg-opacity-10";
  };

  let variantAssigner = function (amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "success";
    else if (ratio < 0.75) return "warning";
    else return "danger";
  };

  return (
    <Card className="mt-2 col-md-5 border">
      <Card.Body className={colorAssigner(props.amount, props.max)}>
        <Card.Title className="d-flex justify-content-between aling-item-baseline">
          <div className="text-capitalize h3">{props.name}</div>
          <div className="">
            ${props.amount}
            {props.max && (
              <span className="text-muted fs-6"> / ${props.max}</span>
            )}
          </div>
        </Card.Title>
        {props.max && (
          <ProgressBar
            className="rounded-pill"
            variant={variantAssigner(props.amount, props.max)}
            min={0}
            max={props.max}
            now={props.amount}
          />
        )}
        {!props.showbtn && (
          <Stack className="mt-2" direction="horizontal" gap={1}>
            <Button
              className="ms-auto"
              variant="outline-dark"
              size="sm"
              onClick={props.onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={props.onViewExpenseClick}
            >
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
