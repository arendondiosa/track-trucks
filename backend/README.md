# Track Trucks API Backend

Backend API for the Track Trucks application, built with FastAPI.

## Project Structure

```
backend/
├── app/
│   ├── api/                # API endpoints
│   │   └── v1/            # API version 1.0
│   ├── core/              # Core functionality
│   ├── db/                # Database models and connections
│   ├── schemas/           # Pydantic models
│   ├── services/          # Business logic
│   ├── tests/             # Test suite
│   └── main.py            # FastAPI application entry point
├── pyproject.toml         # Project configuration
├── Makefile               # Useful commands
└── requirements.txt       # Project dependencies
```

## Development

### Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

### Run the API

```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

API Documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Code Quality

The project uses several tools for code quality:

- **Black**: Code formatter
- **isort**: Import sorter
- **Ruff**: Linter

Run them using:

```bash
# Format code
make format

# Check for linting issues
make lint
```

### Testing

Run tests with:

```bash
# Run all tests
make test

# Run tests with coverage
make test-cov
```

## Docker

The project can be run using Docker:

```bash
# Build the image
docker build -t track-trucks-api .

# Run the container
docker run -p 8000:8000 track-trucks-api
```

Or use Docker Compose from the root directory:

```bash
docker compose -f infra/docker-compose.yml up
```
