#!/bin/bash

# Start the development environment
echo "Starting development environment..."
cd "$(dirname "$0")/infra"
docker compose up -d

# Print URLs
echo ""
echo "Development environment is ready:"
echo "- Backend API: http://localhost:8000"
echo "- Backend API Documentation: http://localhost:8000/docs"
echo "- Frontend: http://localhost:3000"
echo ""
echo "To stop the environment, run: ./dev.sh stop"
echo ""

# Handle stop command
if [ "$1" == "stop" ]; then
  echo "Stopping development environment..."
  cd "$(dirname "$0")/infra"
  docker compose down
fi
