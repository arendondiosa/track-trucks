from fastapi import APIRouter

router = APIRouter(prefix="/trucks")


@router.get("/")
def get_trucks():
    """Get a list of all trucks"""
    # This would typically fetch from a database
    return [
        {"id": 1, "plate": "ABC123", "status": "active"},
        {"id": 2, "plate": "XYZ789", "status": "maintenance"},
    ]


@router.get("/{truck_id}")
def get_truck(truck_id: int):
    """Get details for a specific truck"""
    # In a real app, this would fetch from a database
    return {"id": truck_id, "plate": f"TRUCK-{truck_id}", "status": "active"}


@router.post("/")
def create_truck(truck: dict):
    """Create a new truck"""
    # This would typically save to a database
    return {"id": 3, "message": "Truck created successfully", **truck}
