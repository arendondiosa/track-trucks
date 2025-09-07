from fastapi import APIRouter

router = APIRouter(prefix="/drivers")


@router.get("/")
def get_drivers():
    """Get a list of all drivers"""
    # This would typically fetch from a database
    return [
        {"id": 1, "name": "John Doe", "license": "DL12345"},
        {"id": 2, "name": "Jane Smith", "license": "DL67890"},
    ]


@router.get("/{driver_id}")
def get_driver(driver_id: int):
    """Get details for a specific driver"""
    return {"id": driver_id, "name": f"Driver {driver_id}", "license": f"DL{driver_id}"}


@router.post("/")
def create_driver(driver: dict):
    """Create a new driver"""
    return {"id": 3, "message": "Driver created successfully", **driver}
