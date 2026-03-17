import unittest

from calculator import Calculator


class CalculatorTest(unittest.TestCase):
    def setUp(self) -> None:
        self.calc = Calculator()

    def test_add(self):
        self.assertEqual(self.calc.add(2, 3), 5)

    def test_subtract(self):
        self.assertEqual(self.calc.subtract(10, 4), 6)

    def test_multiply(self):
        self.assertEqual(self.calc.multiply(6, 7), 42)

    def test_divide(self):
        self.assertEqual(self.calc.divide(8, 2), 4)

    def test_divide_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            self.calc.divide(1, 0)

    def test_evaluate_expression(self):
        self.assertEqual(self.calc.evaluate("1 + 2 * 3"), 7)

    def test_evaluate_parentheses(self):
        self.assertEqual(self.calc.evaluate("(1 + 2) * 3"), 9)

    def test_evaluate_unary_minus(self):
        self.assertEqual(self.calc.evaluate("-5 + 2"), -3)

    def test_invalid_expression(self):
        with self.assertRaises(ValueError):
            self.calc.evaluate("__import__('os').system('echo bad')")


if __name__ == "__main__":
    unittest.main()
