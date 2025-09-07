from fastapi import APIRouter

from . import drivers, trucks

# Create the main v1 API router
router = APIRouter()

# Include the other routers
router.include_router(trucks.router)
router.include_router(drivers.router)
