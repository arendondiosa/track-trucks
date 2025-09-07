# Testing Guide for Track Trucks API

This directory contains the test suite for the Track Trucks API.

## Running Tests

To run the tests, navigate to the backend directory and execute:

```bash
pytest
```

To run tests with coverage reporting:

```bash
pytest --cov=app --cov-report=term-missing
```

Or use the Makefile shortcuts:

```bash
# Run tests
make test

# Run tests with coverage
make test-cov
```

## Test Structure

- `conftest.py`: Contains shared fixtures for all tests
- `test_main.py`: Tests for the main application endpoints
- `test_trucks.py`: Tests for the truck-specific endpoints

## Adding New Tests

When adding new endpoints, please add corresponding test files with appropriate test cases.
Follow these guidelines:

1. Name test files as `test_*.py`
2. Name test functions as `test_*`
3. Create descriptive docstrings explaining what each test does
4. Use fixtures from `conftest.py` when possible to reduce code duplication
5. Aim for 80% or higher test coverage

## Coverage Requirements

The project has a minimum coverage requirement of 80%. Coverage reports are
generated automatically during CI/CD runs and can be viewed in the GitHub Actions
workflow results.
