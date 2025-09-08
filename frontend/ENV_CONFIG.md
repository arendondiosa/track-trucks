# Environment Configuration

This document explains the environment variables used in the frontend application.

## Available Variables

### API Base URL
- **Variable Name**: `VITE_API_BASE_URL`
- **Description**: The base URL for API requests to the backend server.
- **Default**: `http://localhost:8000/api/v1.0`
- **Production**: Should be set to your production API URL

### Google Maps API Key
- **Variable Name**: `VITE_GOOGLE_MAPS_API_KEY`
- **Description**: API key for Google Maps integration.
- **Note**: For production, use a restricted API key with appropriate domain limitations.

## Environment Files

The application uses the following environment files:

- `.env`: Default environment variables, loaded in all environments
- `.env.development`: Variables loaded during development (overrides `.env`)
- `.env.production`: Variables loaded during production builds (overrides `.env`)

## Usage in Code

Access these variables in your code using:

```javascript
import.meta.env.VARIABLE_NAME
```

Example:
```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## Important Notes

1. Environment variables must be prefixed with `VITE_` to be accessible in the client code.
2. Never commit sensitive secrets to version control.
3. For production deployments, set the variables in your CI/CD pipeline or hosting platform.
