from fastapi import APIRouter, Body
from pydantic import BaseModel, Field


# Define the truck model for better documentation
class TruckBase(BaseModel):
    plate: str = Field(..., description="Truck license plate", example="ABC123")
    status: str = Field(
        ..., description="Current status of the truck", example="active"
    )


class TruckCreate(TruckBase):
    pass


class Truck(TruckBase):
    id: int = Field(..., description="Unique identifier for the truck")

    class Config:
        schema_extra = {"example": {"id": 1, "plate": "ABC123", "status": "active"}}


# Create a router with a tag for swagger UI grouping
router = APIRouter(
    prefix="/trucks",
    tags=["Trucks"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[Truck], summary="Get All Trucks")
def get_trucks():
    """
    Get a list of all trucks in the system

    Returns a list of all registered trucks with their details.
    """
    # This would typically fetch from a database
    return [
        {"id": 1, "plate": "ABC123", "status": "active"},
        {"id": 2, "plate": "XYZ789", "status": "maintenance"},
    ]


@router.get("/{truck_id}", response_model=Truck, summary="Get Truck by ID")
def get_truck(truck_id: int):
    """
    Get details for a specific truck

    Parameters:
    - **truck_id**: The unique identifier of the truck

    Returns details for the requested truck.
    """
    # In a real app, this would fetch from a database
    return {"id": truck_id, "plate": f"TRUCK-{truck_id}", "status": "active"}


@router.post("/", response_model=Truck, summary="Create New Truck")
def create_truck(truck: TruckCreate = Body(...)):
    """
    Create a new truck in the system

    Parameters:
    - **truck**: Truck information

    Returns the created truck with its assigned ID.
    """
    # This would typically save to a database
    return {"id": 3, "message": "Truck created successfully", **truck.model_dump()}
