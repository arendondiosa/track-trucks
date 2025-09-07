import json
import os
from typing import Any, Dict

from fastapi import HTTPException

# Path to the JSON data file '../db/trips.json'
TRIPS_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "db", "trips.json")


class TripsManager:
    """Manager class to handle trips data operations."""

    @staticmethod
    def load_trips_data() -> Dict[str, Any]:
        """Load trips data from the JSON file."""
        try:
            with open(TRIPS_DATA_PATH, "r") as file:
                return json.load(file)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            raise HTTPException(
                status_code=500, detail=f"Failed to load trips data: {str(e)}"
            ) from e
