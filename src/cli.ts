import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import { calculate, isOperator, type Operator } from "./calculator.js";

const lines = createInterface({ input: stdin, crlfDelay: Infinity });
let stage: "left" | "operator" | "right" = "left";
let left = 0;
let operator: Operator = "+";

function prompt(): void {
  const prompts = {
    left: "First number: ",
    operator: "Operator (+, -, *, /): ",
    right: "Second number: ",
  };
  stdout.write(prompts[stage]);
}

console.log("Console Calculator");
console.log("Enter q or quit at any prompt to exit.");
prompt();

try {
  for await (const line of lines) {
    const value = line.trim();
    if (["q", "quit"].includes(value.toLowerCase())) {
      break;
    }

    if (stage === "operator") {
      if (isOperator(value)) {
        operator = value;
        stage = "right";
      } else {
        console.log("Please choose +, -, *, or /.");
      }
    } else {
      const number = Number(value);
      if (value === "" || !Number.isFinite(number)) {
        console.log("Please enter a valid finite number.");
      } else if (stage === "left") {
        left = number;
        stage = "operator";
      } else {
        try {
          console.log(`Result: ${calculate(left, operator, number)}`);
        } catch (error) {
          if (!(error instanceof Error)) {
            throw error;
          }
          console.log(`Error: ${error.message}`);
        }
        stage = "left";
      }
    }
    prompt();
  }
} finally {
  lines.close();
}

console.log("\nGoodbye!");
