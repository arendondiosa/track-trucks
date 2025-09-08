from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.controllers.trips import TripsController


class TripBase(BaseModel):
    truck_id: int = Field(..., description="ID of the truck assigned to the trip")
    source_city: str = Field(
        ...,
        description="Source city of the trip",
        json_schema_extra={"example": "New York"},
    )
    destination_city: str = Field(
        ...,
        description="Destination city of the trip",
        json_schema_extra={"example": "Los Angeles"},
    )
    first_detection: Optional[str] = Field(
        ...,
        description="Timestamp of the first detection",
        json_schema_extra={"example": "2023-01-01T12:00:00Z"},
    )
    last_detection: Optional[str] = Field(
        ...,
        description="Timestamp of the last detection",
        json_schema_extra={"example": "2023-01-02T12:00:00Z"},
    )


class Trip(TripBase):
    id: int = Field(..., description="Unique identifier for the trip")

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "truck_id": 101,
                "source_city": "New York",
                "destination_city": "Los Angeles",
                "first_detection": "2023-01-01T12:00:00Z",
                "last_detection": "2023-01-02T12:00:00Z",
            }
        }


router = APIRouter(
    prefix="/trips",
    tags=["Trips"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list, summary="Get All Trips")
def get_trips():
    """
    Get a list of all trips in the system

    Returns a list of all registered trips with their details.
    """
    all_trips = TripsController().get_all_trips()
    return all_trips


@router.get("/filter", response_model=list, summary="Get Filtered Trips")
def get_filtered_trips(
    source_city: Optional[str] = None,
    destination_city: Optional[str] = None,
    # start_date: Optional[str] = None,
    # end_date: Optional[str] = None,
):
    """
    Get filtered trips based on query parameters

    Parameters:
    - **source_city**: Optional filter by source city
    - **destination_city**: Optional filter by destination city
    - **truck_id**: Optional filter by truck ID
    - **start_date**: Optional filter by start date (ISO format)
    - **end_date**: Optional filter by end date (ISO format)

    Returns trips matching the specified filters.
    """
    filters = {}
    if source_city:
        filters["source_city"] = source_city
    if destination_city:
        filters["destination_city"] = destination_city
    # if start_date:
    #     filters["start_date"] = start_date
    # if end_date:
    #     filters["end_date"] = end_date

    all_trips = TripsController().get_trips_by_filters(filters=filters)
    return all_trips


@router.get("/cities", response_model=dict, summary="Get All Unique Cities")
def get_cities():
    """
    Get a list of all unique cities from the trips data

    Returns a list of unique cities involved in trips.
    """
    cities = TripsController().get_cities()
    return cities
