from fastapi import APIRouter

from .v1 import router as v1_router

# Main API router
router = APIRouter(
    responses={
        404: {"description": "Not found"},
        500: {"description": "Internal server error"},
    }
)

# Include versioned routers with appropriate prefixes
router.include_router(v1_router, prefix="/v1.0")
