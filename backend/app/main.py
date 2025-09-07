from fastapi import FastAPI

from app.api import router as api_router

# Create the main FastAPI application
app = FastAPI(
    title="Track Trucks API",
    description="API for tracking trucks and transportation data",
    version="1.0",
)


# Root endpoint for health check and easy access
@app.get("/")
def root():
    return {
        "message": "Welcome to Track Trucks API. Access the API at /api/v1.0/ or view docs at /docs"
    }


# Health check endpoint
@app.get("/health")
def health():
    return {"status": "ok"}


# Include the API router with prefix
app.include_router(api_router, prefix="/api")
