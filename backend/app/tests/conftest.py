import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    """
    Create a test client for the FastAPI app.
    This fixture can be used by all test functions to make requests to the API.
    """
    return TestClient(app)


@pytest.fixture
def sample_truck():
    """
    Sample truck data for use in tests
    """
    return {"id": 1, "plate": "ABC123", "status": "active"}


@pytest.fixture
def sample_truck_create():
    """
    Sample truck creation data for use in tests
    """
    return {"plate": "NEW123", "status": "active"}
