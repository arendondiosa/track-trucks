from fastapi import APIRouter

from . import trips

# Create the main v1 API router with versioning tag
router = APIRouter(
    tags=["v1.0"],
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal server error"},
    },
)

# Include the other routers
router.include_router(trips.router)


# Add a version-specific health check
@router.get("/status", tags=["System"], summary="API v1.0 Status")
def api_status():
    """
    Check the status of the v1.0 API

    Returns version-specific information about the API.
    """
    return {"version": "1.0", "status": "operational", "endpoints": ["trucks", "trips"]}
