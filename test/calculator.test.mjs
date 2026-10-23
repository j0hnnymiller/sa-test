import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { calculate, isOperator } from "../dist/calculator.js";

test("supports all four arithmetic operations", () => {
  assert.equal(calculate(2, "+", 3), 5);
  assert.equal(calculate(2, "-", 3), -1);
  assert.equal(calculate(-2, "*", 3), -6);
  assert.equal(calculate(7, "/", 2), 3.5);
  assert.equal(calculate(0, "*", 3), 0);
  assert.equal(calculate(1.5, "+", 2.25), 3.75);
});

test("rejects invalid operations, nonfinite numbers, and overflow", () => {
  assert.throws(() => calculate(1, "/", 0), /divide by zero/);
  assert.throws(() => calculate(1, "/", -0), /divide by zero/);
  assert.throws(() => calculate(Infinity, "+", 1), /finite numbers/);
  assert.throws(() => calculate(1, "+", NaN), /finite numbers/);
  assert.throws(() => calculate(Number.MAX_VALUE, "*", 2), /numeric range/);
  assert.throws(() => calculate(1, "%", 2), /choose/);
  for (const operator of ["+", "-", "*", "/"]) {
    assert.equal(isOperator(operator), true);
  }
  assert.equal(isOperator("%"), false);
});

function run(input) {
  const result = spawnSync(process.execPath, ["dist/cli.js"], {
    input,
    encoding: "utf8",
    timeout: 5000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  return result.stdout;
}

test("CLI performs repeated calculations", () => {
  const output = run("2\n+\n3\n7\n-\n10\n-2\n*\n4\n7\n/\n2\nq\n");
  for (const result of ["5", "-3", "-8", "3.5"]) {
    assert.ok(output.includes(`Result: ${result}`), output);
  }
  assert.match(output, /Goodbye!/);
});

test("CLI validates input and recovers after arithmetic errors", () => {
  const output = run("\nabc\nInfinity\n2\n%\n/\n0\n1e308\n*\n2\n1.5\n+\n2.25\nquit\n");
  assert.match(output, /valid finite number/);
  assert.match(output, /Please choose/);
  assert.match(output, /Cannot divide by zero/);
  assert.match(output, /numeric range/);
  assert.match(output, /Result: 3.75/);
});

test("CLI exits at any prompt and on end of input", () => {
  for (const input of ["Q\n", "1\nquit\n", "1\n+\nq\n", "", "1\n+\n"]) {
    assert.match(run(input), /Goodbye!/);
  }
});
