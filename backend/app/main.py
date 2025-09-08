from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router as api_router

# Create the main FastAPI application
app = FastAPI(
    title="Track Trucks API",
    description="API for tracking trucks and transportation data",
    version="1.0",
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Root endpoint for health check and easy access
@app.get(
    "/",
    tags=["System"],
    summary="API Root",
    description="Welcome endpoint for the Track Trucks API",
)
def root():
    return {
        "message": (
            "Welcome to Track Trucks API. Access the API at /api/v1.0/ "
            "or view docs at /docs"
        )
    }


# Health check endpoint
@app.get(
    "/health",
    tags=["System"],
    summary="Health Check",
    description="Check if the API is running correctly",
    response_description="Returns OK status when the API is healthy",
)
def health():
    return {"status": "ok"}


# Include the API router with prefix
app.include_router(api_router, prefix="/api")
