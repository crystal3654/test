"""Simple calculator implementation with a safe expression evaluator."""

from __future__ import annotations

import ast
from typing import Union

Number = Union[int, float]


class Calculator:
    """Basic calculator that supports arithmetic operations."""

    def add(self, a: Number, b: Number) -> Number:
        return a + b

    def subtract(self, a: Number, b: Number) -> Number:
        return a - b

    def multiply(self, a: Number, b: Number) -> Number:
        return a * b

    def divide(self, a: Number, b: Number) -> float:
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return a / b

    def evaluate(self, expression: str) -> Number:
        """Evaluate arithmetic expression safely.

        Supported operators: +, -, *, / and parentheses.
        """

        node = ast.parse(expression, mode="eval")
        return self._eval_node(node.body)

    def _eval_node(self, node: ast.AST) -> Number:
        if isinstance(node, ast.BinOp):
            left = self._eval_node(node.left)
            right = self._eval_node(node.right)
            if isinstance(node.op, ast.Add):
                return self.add(left, right)
            if isinstance(node.op, ast.Sub):
                return self.subtract(left, right)
            if isinstance(node.op, ast.Mult):
                return self.multiply(left, right)
            if isinstance(node.op, ast.Div):
                return self.divide(left, right)
            raise ValueError("Unsupported operator")

        if isinstance(node, ast.UnaryOp):
            operand = self._eval_node(node.operand)
            if isinstance(node.op, ast.UAdd):
                return +operand
            if isinstance(node.op, ast.USub):
                return -operand
            raise ValueError("Unsupported unary operator")

        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return node.value

        raise ValueError("Unsupported expression")


def main() -> None:
    calc = Calculator()
    expression = input("式を入力してください (例: 1 + 2 * 3): ")
    try:
        result = calc.evaluate(expression)
        print(f"結果: {result}")
    except Exception as exc:  # CLI entrypoint guard
        print(f"エラー: {exc}")


if __name__ == "__main__":
    main()
