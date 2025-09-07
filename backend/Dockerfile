FROM python:3.13-slim AS base

WORKDIR /app

# Development stage
FROM base AS dev
RUN pip install --no-cache-dir pytest pytest-cov httpx

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy requirements files first for better caching
COPY requirements.txt .
COPY requirements-dev.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt -r requirements-dev.txt

# When using volume mounts, we don't need to copy code at build time
# The code will be mounted at runtime from the host

# Production stage
FROM base AS prod

# Copy requirements files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .
