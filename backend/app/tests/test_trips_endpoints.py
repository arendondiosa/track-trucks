"""
Tests for the trips endpoints
"""

from unittest.mock import patch

from app.tests.mock_data import mock_trips_data


class TestTripsEndpoints:
    """
    Test class for trips-related endpoints
    """

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_all_trips(self, mock_load_trips, client):
        """
        Test getting all trips returns the correct data
        """
        # Set up the mock to return our test data
        mock_load_trips.return_value = mock_trips_data

        # Make the request to the endpoint
        response = client.get("/api/v1.0/trips/")

        # Verify the response
        assert response.status_code == 200
        trips = response.json()
        assert len(trips) == 3
        assert trips[0]["id"] == 1
        assert trips[0]["origin"] == "New York"
        assert trips[1]["id"] == 2
        assert trips[1]["origin"] == "San Francisco"
        assert trips[2]["id"] == 3
        assert trips[2]["origin"] == "Chicago"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_filter_by_source_city(self, mock_load_trips, client):
        """
        Test filtering trips by source city
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Make the request with source_city filter
        response = client.get("/api/v1.0/trips/filter?source_city=New York")

        # Verify the response
        assert response.status_code == 200
        trips = response.json()
        assert len(trips) == 1
        assert trips[0]["origin"] == "New York"
        assert trips[0]["destination"] == "Washington DC"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_filter_by_destination_city(self, mock_load_trips, client):
        """
        Test filtering trips by destination city
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Make the request with destination_city filter
        response = client.get("/api/v1.0/trips/filter?destination_city=Los Angeles")

        # Verify the response
        assert response.status_code == 200
        trips = response.json()
        assert len(trips) == 1
        assert trips[0]["origin"] == "San Francisco"
        assert trips[0]["destination"] == "Los Angeles"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_filter_by_source_and_destination_city(self, mock_load_trips, client):
        """
        Test filtering trips by both source and destination city
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Make the request with both source_city and destination_city filters
        response = client.get(
            "/api/v1.0/trips/filter?source_city=Chicago&destination_city=Denver"
        )

        # Verify the response
        assert response.status_code == 200
        trips = response.json()
        assert len(trips) == 1
        assert trips[0]["origin"] == "Chicago"
        assert trips[0]["destination"] == "Denver"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_filter_no_matching_routes(self, mock_load_trips, client):
        """
        Test filtering with criteria that match no routes
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Make the request with filters that won't match any routes
        response = client.get("/api/v1.0/trips/filter?source_city=Boston")

        # Verify the response
        assert response.status_code == 200
        trips = response.json()
        assert len(trips) == 0

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_filter_case_insensitive(self, mock_load_trips, client):
        """
        Test that filtering is case-insensitive
        """
        # Set up the mock
        mock_load_trips.return_value = mock_trips_data

        # Make the request with lowercase source_city
        response = client.get("/api/v1.0/trips/filter?source_city=new york")

        # Verify the response
        assert response.status_code == 200
        trips = response.json()
        assert len(trips) == 1
        assert trips[0]["origin"] == "New York"

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_empty_trips_data(self, mock_load_trips, client):
        """
        Test handling of empty trips data
        """
        # Set up the mock to return empty data
        mock_load_trips.return_value = {}

        # Make the request
        response = client.get("/api/v1.0/trips/")

        # Verify the response
        assert response.status_code == 200
        assert response.json() == []

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_cities(self, mock_load_trips, client):
        """
        Test getting all unique cities endpoint
        """
        # Set up the mock to return our test data
        mock_load_trips.return_value = mock_trips_data

        # Make the request to the cities endpoint
        response = client.get("/api/v1.0/trips/cities")

        # Verify the response
        assert response.status_code == 200
        cities = response.json()

        # Verify the structure of the response
        assert isinstance(cities, dict)
        assert "New York" in cities
        assert "San Francisco" in cities
        assert "Chicago" in cities

        # Verify each origin city has the correct destinations
        assert "Washington DC" in cities["New York"]
        assert "Los Angeles" in cities["San Francisco"]
        assert "Denver" in cities["Chicago"]

        # Verify there are 3 origin cities
        assert len(cities) == 3

    @patch("app.managers.trips.TripsManager.load_trips_data")
    def test_get_cities_empty_data(self, mock_load_trips, client):
        """
        Test getting cities from empty data
        """
        # Set up the mock to return empty data
        mock_load_trips.return_value = {}

        # Make the request to the cities endpoint
        response = client.get("/api/v1.0/trips/cities")

        # Verify the response
        assert response.status_code == 200
        assert response.json() == {}
