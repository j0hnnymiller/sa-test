export type Operator = "+" | "-" | "*" | "/";

export function isOperator(value: string): value is Operator {
  return value === "+" || value === "-" || value === "*" || value === "/";
}

export function calculate(left: number, operator: Operator, right: number): number {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Please enter finite numbers.");
  }

  let result: number;
  switch (operator) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      if (right === 0) {
        throw new Error("Cannot divide by zero.");
      }
      result = left / right;
      break;
    default:
      throw new Error("Please choose +, -, *, or /.");
  }

  if (!Number.isFinite(result)) {
    throw new Error("Result is outside the supported numeric range.");
  }
  return result;
}
