"""
Tests for the trucks endpoints
"""


def test_get_trucks(client):
    """
    Test getting all trucks
    """
    response = client.get("/api/v1.0/trucks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    for truck in data:
        assert "id" in truck
        assert "plate" in truck
        assert "status" in truck


def test_get_truck_by_id(client):
    """
    Test getting a specific truck by ID
    """
    truck_id = 1
    response = client.get(f"/api/v1.0/trucks/{truck_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == truck_id
    assert data["plate"] == f"TRUCK-{truck_id}"
    assert data["status"] == "active"


def test_create_truck(client, sample_truck_create):
    """
    Test creating a new truck
    """
    response = client.post("/api/v1.0/trucks/", json=sample_truck_create)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 3  # As hardcoded in the implementation
    assert data["plate"] == sample_truck_create["plate"]
    assert data["status"] == sample_truck_create["status"]
    # Note: 'message' field is filtered out by the response_model
