# Track Trucks

Track Trucks is a system for monitoring and tracking truck routes, carriers, and transportation data.

## Project Structure

The project consists of two main components:

- **Backend**: A FastAPI application that provides RESTful endpoints to access truck and trip data
- **Frontend**: A React application for visualizing truck data and routes

## Backend Development

### Setup Development Environment

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv env
source env/bin/activate  # On Linux/Mac
# or
.\env\Scripts\activate  # On Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

### Run in Development Mode

To start the backend server in development mode:

```bash
cd backend
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Docker Development Mode

To run the backend using Docker with real-time code changes (using volumes):

```bash
cd infra
docker compose up -d
```

This will mount your local code directory into the container, allowing you to make changes that are immediately reflected in the running application.

## Code Quality Tools

The backend uses several tools to ensure code quality:

### Run All Static Checks

To run all static checks at once:

```bash
cd backend
./run_all_checks.sh
```

### Individual Code Quality Tools

#### Black (Code Formatter)

Format your code with Black:

```bash
cd backend
black app/
```

#### Ruff (Linter)

Lint your code with Ruff:

```bash
cd backend
ruff check app/
```

Fix auto-fixable issues:

```bash
ruff check --fix app/
```

#### isort (Import Sorter)

Sort imports with isort:

```bash
cd backend
isort app/
```

#### mypy (Type Checker)

Check types with mypy:

```bash
cd backend
mypy app/
```

## Testing

### Run Tests

To run the test suite:

```bash
cd backend
pytest
```

### Run Tests with Coverage

To run tests with coverage reporting:

```bash
cd backend
./run_tests_with_coverage.sh
```

This will generate an HTML coverage report in `coverage_html_report/`.

## API Endpoints

The main API routes are:

- Health check: `GET /health`
- API status: `GET /api/v1.0/status`
- Get all trips: `GET /api/v1.0/trips/`
- Filter trips: `GET /api/v1.0/trips/filter?source_city=New%20York&destination_city=Washington%20DC`

All API endpoints are prefixed with `/api/v1.0/`.

## Frontend Development

Instructions for setting up and running the frontend will be added here.
