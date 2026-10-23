# Console Calculator

A sample TypeScript console application supporting addition (`+`), subtraction
(`-`), multiplication (`*`), and division (`/`).

## Requirements

- Node.js 22 or newer
- npm

## Run

```powershell
npm install
npm start
```

Enter the first number, operator, and second number at the prompts:

```text
First number: 12
Operator (+, -, *, /): /
Second number: 4
Result: 3
```

The calculator then starts another calculation. Enter `q` or `quit` at any
prompt to exit. End of input also exits cleanly.

Negative numbers and decimals are supported. Invalid input is reported and
retried. Division by zero and numeric overflow display an error and start a
new calculation. Arithmetic uses JavaScript floating-point numbers, so decimal
results can include rounding artifacts (for example, `0.1 + 0.2`).

## Build and test

```powershell
npm run build
npm test
```

Tests cover arithmetic operations, validation, error recovery, repeated
calculations, and console exit behavior. No Azure services or runtime packages
are required.
