// jest.setup.js
import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_API_BASE_URL = 'http://localhost:8000/api/v1.0';
process.env.VITE_GOOGLE_MAPS_API_KEY = 'test-api-key';

// Mock fetch
global.fetch = jest.fn();

// Mock Google Maps
class MockLatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  lat() { return this.lat; }
  lng() { return this.lng; }
}

global.google = {
  maps: {
    DirectionsService: class {
      route(request, callback) {
        callback({
          routes: [
            {
              overview_polyline: 'test_polyline',
              legs: [{
                start_location: new MockLatLng(37.7749, -122.4194),
                end_location: new MockLatLng(34.0522, -118.2437)
              }]
            },
            {
              overview_polyline: 'alt_polyline',
              legs: [{
                start_location: new MockLatLng(37.7749, -122.4194),
                end_location: new MockLatLng(34.0522, -118.2437)
              }]
            }
          ]
        }, 'OK');
      }
    },
    Polyline: class {
      setOptions() {}
      setPath() {}
      setMap() {}
    },
    event: {
      addListener: () => {},
      clearInstanceListeners: () => {},
    },
    TravelMode: {
      DRIVING: 'DRIVING',
    },
    Marker: class {
      setMap() {}
      setPosition() {}
    }
  },
};
