from fastapi import APIRouter

from .v1 import router as v1_router

# Main API router
router = APIRouter()

# Include versioned routers
router.include_router(v1_router, prefix="/v1.0")
