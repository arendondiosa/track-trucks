# Track Trucks

Track Trucks is a comprehensive system for monitoring and visualizing truck routes, carriers, and transportation data across cities with an interactive map interface.

## Project Overview

Track Trucks enables logistics companies and fleet managers to:

- Visualize truck routes between cities on an interactive map
- View carriers operating on specific routes
- Filter routes by source and destination cities
- Track the number of trucks per day on each route
- Get alternative routes between cities with Google Maps integration

## Project Structure

The project follows a modern microservices architecture:

- **Backend**: A FastAPI application that provides RESTful endpoints to access truck and trip data
- **Frontend**: A React + Vite application with Google Maps integration for visualizing truck data and routes
- **Docker**: Containerization for both frontend and backend with development and production configurations

## Technology Stack

### Backend
- [Python 3.13](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/) - High-performance web framework
- [Pydantic](https://docs.pydantic.dev/) - Data validation and settings management
- [Pytest](https://pytest.org/) - Testing framework
- [Ruff](https://github.com/astral-sh/ruff) - Fast Python linter
- [Black](https://black.readthedocs.io/) - Code formatter
- [isort](https://pycqa.github.io/isort/) - Import sorter
- [mypy](https://mypy.readthedocs.io/) - Static type checker
- [Uvicorn](https://www.uvicorn.org/) - ASGI server

### Frontend
- [React 19](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Google Maps API](https://developers.google.com/maps) - Interactive mapping
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/) - React components for Google Maps
- [Ant Design](https://ant.design/) - UI component library
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities
- [ESLint](https://eslint.org/) - JavaScript linter
- [Prettier](https://prettier.io/) - Code formatter

### DevOps
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) - Containerization
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

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

## API Documentation

### API Endpoints

All API endpoints are prefixed with `/api/v1.0/`.

#### Health & Status Endpoints

- `GET /health`: Health check endpoint for monitoring and load balancers
- `GET /api/v1.0/status`: API status information

#### Trip Endpoints

- `GET /api/v1.0/trips/`: Get all trips
  - Returns a list of all available truck trips
  - Example response:
    ```json
    [
      {
        "id": 1,
        "source_city": "New York",
        "destination_city": "Washington DC",
        "carriers": [
          {
            "id": 101,
            "name": "Knight-Swift Transport Services",
            "trucks_per_day": 10
          }
        ]
      }
    ]
    ```

- `GET /api/v1.0/trips/filter`: Filter trips by source and/or destination cities
  - Query parameters:
    - `source_city`: (optional) Filter by origin city
    - `destination_city`: (optional) Filter by destination city
  - Example: `/api/v1.0/trips/filter?source_city=New%20York&destination_city=Washington%20DC`

- `GET /api/v1.0/trips/cities`: Get all available cities and their connections
  - Returns an object with cities as keys and arrays of destinations as values
  - Example response:
    ```json
    {
      "New York": ["Washington DC", "Boston"],
      "Chicago": ["Denver", "Detroit"]
    }
    ```

### Interactive API Documentation

- **Swagger UI**: Available at `/docs` when running the backend server
- **ReDoc**: Available at `/redoc` for a more user-friendly documentation experience

## Frontend Development

### Setup Development Environment

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies using Yarn:

```bash
yarn install
```

### Run in Development Mode

To start the frontend development server with hot reloading:

```bash
cd frontend
yarn dev
```

The application will be available at `http://localhost:5173`.

### Frontend Testing

Run Jest tests with:

```bash
cd frontend
yarn test
```

Run tests with coverage reporting:

```bash
cd frontend
yarn test --coverage
```

### Code Quality Tools

The frontend uses several tools to ensure code quality:

#### ESLint (Linter)

Lint your code with ESLint:

```bash
cd frontend
yarn lint
```

#### Prettier (Code Formatter)

Check code formatting with Prettier:

```bash
cd frontend
yarn format:check
```

Format your code with Prettier:

```bash
cd frontend
yarn format
```

### Build for Production

Build the frontend for production:

```bash
cd frontend
yarn build
```

This will generate optimized production files in the `dist` directory.

## Running the Complete Application with Docker

You can run the complete application (frontend and backend) using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Build and start the backend FastAPI application
- Build and start the frontend React application
- Set up the necessary networking between containers
- Mount volumes for development with hot reloading

### Accessing the Application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment, with workflows defined in `.github/workflows/`:

- Code quality checks (linting, formatting)
- Unit tests with coverage reporting
- Build verification
- Deployment automation

## Environment Variables

### Backend

- `ENVIRONMENT`: Development or production environment
- `DEBUG`: Enable debug mode
- `CORS_ORIGINS`: Allowed origins for CORS

### Frontend

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API key for mapping features

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
