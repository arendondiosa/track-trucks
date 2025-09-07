#!/bin/bash

# Run pytest with coverage
python -m pytest --cov=app --cov-report=html --cov-report=term-missing app/tests/

# Show coverage report
echo "Coverage report generated in ./coverage_html_report/"
echo "Open ./coverage_html_report/index.html in your browser to view the detailed report"
