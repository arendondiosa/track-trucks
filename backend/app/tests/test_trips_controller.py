"""
Tests for the trips controller
"""

from unittest.mock import patch

import pytest

from app.controllers.trips import TripsController
from app.tests.mock_data import mock_trips_data


class TestTripsController:
    """
    Test class for the TripsController
    """

    @pytest.fixture
    def trips_controller(self):
        """
        Create a TripsController instance for testing
        """
        return TripsController()

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_all_trips(self, mock_load_trips, trips_controller):
        """
        Test getting all trips from the controller
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Call the controller method
        result = trips_controller.get_all_trips()

        # Verify the result
        assert len(result) == 3
        assert result[0]["id"] == 1
        assert result[0]["origin"] == "New York"
        assert result[1]["id"] == 2
        assert result[2]["id"] == 3

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_trips_by_filters_source_city(self, mock_load_trips, trips_controller):
        """
        Test filtering trips by source city
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Call the controller method with source_city filter
        filters = {"source_city": "New York"}
        result = trips_controller.get_trips_by_filters(filters)

        # Verify the result
        assert len(result) == 1
        assert result[0]["origin"] == "New York"
        assert result[0]["destination"] == "Washington DC"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_trips_by_filters_dest_city(self, mock_load_trips, trips_controller):
        """
        Test filtering trips by destination city
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Call the controller method with destination_city filter
        filters = {"destination_city": "Los Angeles"}
        result = trips_controller.get_trips_by_filters(filters)

        # Verify the result
        assert len(result) == 1
        assert result[0]["origin"] == "San Francisco"
        assert result[0]["destination"] == "Los Angeles"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_trips_by_filters_both_cities(self, mock_load_trips, trips_controller):
        """
        Test filtering trips by both source and destination city
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Call the controller method with both filters
        filters = {"source_city": "Chicago", "destination_city": "Denver"}
        result = trips_controller.get_trips_by_filters(filters)

        # Verify the result
        assert len(result) == 1
        assert result[0]["origin"] == "Chicago"
        assert result[0]["destination"] == "Denver"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_trips_by_filters_no_match(self, mock_load_trips, trips_controller):
        """
        Test filtering with criteria that match no routes
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Call the controller method with non-matching filter
        filters = {"source_city": "Boston"}
        result = trips_controller.get_trips_by_filters(filters)

        # Verify the result
        assert len(result) == 0

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_trips_by_filters_case(self, mock_load_trips, trips_controller):
        """
        Test that filtering is case-insensitive
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Call the controller method with lowercase source_city
        filters = {"source_city": "new york"}
        result = trips_controller.get_trips_by_filters(filters)

        # Verify the result
        assert len(result) == 1
        assert result[0]["origin"] == "New York"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_trips_empty_data(self, mock_load_trips, trips_controller):
        """
        Test handling of empty trips data
        """
        # Set up the mock to return empty data
        mock_load_trips.return_value = {}

        # Call the controller methods
        all_result = trips_controller.get_all_trips()
        filters = {"source_city": "New York"}
        filtered_result = trips_controller.get_trips_by_filters(filters)

        # Verify the results
        assert all_result == []
        assert filtered_result == []
