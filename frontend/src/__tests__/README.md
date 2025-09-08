# Frontend Unit Tests

This folder contains unit tests for the Track Trucks frontend using Jest and React Testing Library.

## Test Structure

- `__tests__/`: Contains test files that match the pattern `*.test.js` or `*.test.jsx`
- `__mocks__/`: Contains mock implementations for external dependencies and services

## Running the Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (re-runs tests when files change):

```bash
npm run test:watch
```

To generate a coverage report:

```bash
npm run test:coverage
```

## Test Coverage

The test coverage report will be generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` in your browser to view the detailed coverage report.

## Mocked Dependencies

The tests are designed to run without a backend or any external services. The following dependencies are mocked:

- **API Service**: All API calls are mocked to return predefined data
- **Google Maps**: All Google Maps-related functionality is mocked
- **Environment Variables**: The environment variables are mocked in the Jest setup file

## Adding New Tests

When adding new tests:

1. Create a new test file in the `__tests__/` directory with the naming pattern `ComponentName.test.jsx`
2. Import the component to be tested and any necessary mock data or services
3. Use React Testing Library's render functions to test the component
4. Mock any external dependencies or API calls

## Best Practices

- Test component behavior, not implementation details
- Use mock data that resembles real data as closely as possible
- Keep tests isolated and independent from each other
- Focus on user interactions and expected outcomes
