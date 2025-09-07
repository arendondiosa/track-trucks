"""
Tests for the trips manager
"""

import json
from unittest.mock import mock_open, patch

import pytest
from fastapi import HTTPException

from app.managers.trips import TripsManager
from app.tests.mock_data import mock_trips_data


class TestTripsManager:
    """
    Test class for the TripsManager
    """

    def test_load_trips_data_success(self):
        """
        Test successful loading of trips data
        """
        # Mock the open function to return our test data
        mock_file = mock_open(read_data=json.dumps(mock_trips_data))

        with patch("builtins.open", mock_file):
            result = TripsManager.load_trips_data()

            # Verify the result
            assert "routes" in result
            assert len(result["routes"]) == 3
            assert result["routes"][0]["origin"] == "New York"

    def test_load_trips_data_file_not_found(self):
        """
        Test handling of FileNotFoundError
        """
        # Mock open to raise FileNotFoundError
        with patch("builtins.open", side_effect=FileNotFoundError("File not found")):
            with pytest.raises(HTTPException) as exc_info:
                TripsManager.load_trips_data()

            # Verify the exception
            assert exc_info.value.status_code == 500
            assert "Failed to load trips data" in exc_info.value.detail

    def test_load_trips_data_invalid_json(self):
        """
        Test handling of invalid JSON data
        """
        # Mock the open function to return invalid JSON
        mock_file = mock_open(read_data="Invalid JSON")

        with patch("builtins.open", mock_file):
            with pytest.raises(HTTPException) as exc_info:
                TripsManager.load_trips_data()

            # Verify the exception
            assert exc_info.value.status_code == 500
            assert "Failed to load trips data" in exc_info.value.detail
