#!/bin/bash
# Script to run all code quality checks for the backend

echo "Running all code quality checks..."

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Function to run a check and report its status
run_check() {
    local cmd="$1"
    local name="$2"

    echo -e "\n${YELLOW}Running $name...${NC}"
    if $cmd; then
        echo -e "${GREEN}✓ $name passed${NC}"
        return 0
    else
        echo -e "${RED}✗ $name failed${NC}"
        return 1
    fi
}

# Keep track of overall status
STATUS=0

# Run isort
run_check "isort --check-only app/" "isort"
if [ $? -ne 0 ]; then
    echo "To fix: isort app/"
    STATUS=1
fi

# Run black
run_check "black --check app/" "black"
if [ $? -ne 0 ]; then
    echo "To fix: black app/"
    STATUS=1
fi

# Run ruff
run_check "ruff check app/" "ruff"
if [ $? -ne 0 ]; then
    echo "To fix: ruff check --fix app/"
    STATUS=1
fi

# Run mypy
run_check "mypy app/" "mypy"
if [ $? -ne 0 ]; then
    echo "To fix type issues manually"
    STATUS=1
fi

# Run pytest
run_check "pytest" "pytest"
if [ $? -ne 0 ]; then
    echo "Fix failing tests"
    STATUS=1
fi

# Final summary
echo -e "\n----------------------------------------"
if [ $STATUS -eq 0 ]; then
    echo -e "${GREEN}All checks passed! 🎉${NC}"
else
    echo -e "${RED}Some checks failed. Please fix the issues above.${NC}"
fi

exit $STATUS
