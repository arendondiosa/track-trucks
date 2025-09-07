"""
Tests for the main application endpoints
"""


def test_root_endpoint(client):
    """
    Test the root endpoint returns the correct welcome message
    """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": (
            "Welcome to Track Trucks API. Access the API at /api/v1.0/ "
            "or view docs at /docs"
        )
    }


def test_health_endpoint(client):
    """
    Test the health endpoint returns OK status
    """
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_api_v1_status(client):
    """
    Test the v1.0 API status endpoint
    """
    response = client.get("/api/v1.0/status")
    assert response.status_code == 200
    data = response.json()
    assert data["version"] == "1.0"
    assert data["status"] == "operational"
    assert "trucks" in data["endpoints"]
