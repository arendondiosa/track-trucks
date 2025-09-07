"""
Mock data for testing purposes
"""

# Mock trips data for testing
mock_trips_data = {
    "routes": [
        {
            "id": 1,
            "origin": "New York",
            "destination": "Washington DC",
            "carriers": [
                {
                    "id": 101,
                    "name": "Knight-Swift Transport Services",
                    "trucks_per_day": 2,
                    "trucks": [
                        {
                            "id": 1001,
                            "plate_id": "NY-KS-001",
                            "usdot_number": "12345678",
                            "carrier_id": 101,
                            "first_observation": "2025-09-01T08:15:00Z",
                            "last_observation": "2025-09-01T14:30:00Z",
                        },
                        {
                            "id": 1002,
                            "plate_id": "NY-KS-002",
                            "usdot_number": "12345679",
                            "carrier_id": 101,
                            "first_observation": "2025-09-01T09:20:00Z",
                            "last_observation": "2025-09-01T15:45:00Z",
                        },
                    ],
                }
            ],
        },
        {
            "id": 2,
            "origin": "San Francisco",
            "destination": "Los Angeles",
            "carriers": [
                {
                    "id": 201,
                    "name": "XPO Logistics",
                    "trucks_per_day": 1,
                    "trucks": [
                        {
                            "id": 4001,
                            "plate_id": "SF-XPO-001",
                            "usdot_number": "45678901",
                            "carrier_id": 201,
                            "first_observation": "2025-09-01T06:30:00Z",
                            "last_observation": "2025-09-01T09:45:00Z",
                        }
                    ],
                }
            ],
        },
        {
            "id": 3,
            "origin": "Chicago",
            "destination": "Denver",
            "carriers": [
                {
                    "id": 301,
                    "name": "UPS Inc.",
                    "trucks_per_day": 1,
                    "trucks": [
                        {
                            "id": 7001,
                            "plate_id": "CH-UPS-001",
                            "usdot_number": "78901234",
                            "carrier_id": 301,
                            "first_observation": "2025-09-01T06:00:00Z",
                            "last_observation": "2025-09-01T16:30:00Z",
                        }
                    ],
                }
            ],
        },
    ]
}
