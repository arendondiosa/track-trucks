import { render } from '@testing-library/react';
import { useMap } from '@vis.gl/react-google-maps';
import Directions from '../components/Directions';

// Mock the useMap hook
jest.mock('@vis.gl/react-google-maps', () => ({
  useMap: jest.fn(),
  Marker: jest.fn(() => null),
}));

// Mock the Polyline component
jest.mock('../utils/polyline', () => ({
  Polyline: jest.fn(() => null),
}));

describe('Directions Component', () => {
  // Setup mocks
  const mockMap = {};
  const mockSetRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useMap.mockReturnValue(mockMap);
  });

  test('does not request directions when origin or destination is empty', () => {
    // Mock google.maps.DirectionsService
    const mockRoute = jest.fn();
    const originalDirectionsService = google.maps.DirectionsService;

    // Replace with mock implementation
    google.maps.DirectionsService = jest.fn(() => ({
      route: mockRoute,
    }));

    // Render with empty origin
    render(
      <Directions origin="" destination="Los Angeles" refresh={true} setRefresh={mockSetRefresh} />
    );

    // Verify directions service was not called
    expect(mockRoute).not.toHaveBeenCalled();

    // Restore original implementation
    google.maps.DirectionsService = originalDirectionsService;
  });

  test('requests directions when origin and destination are provided and refresh is true', () => {
    // Mock google.maps.DirectionsService
    const mockRoute = jest.fn((request, callback) => {
      callback(
        {
          routes: [
            {
              overview_polyline: 'test_polyline',
              legs: [
                {
                  start_location: { lat: 37.7749, lng: -122.4194 },
                  end_location: { lat: 34.0522, lng: -118.2437 },
                },
              ],
            },
          ],
        },
        'OK'
      );
    });

    const originalDirectionsService = google.maps.DirectionsService;

    // Replace with mock implementation
    google.maps.DirectionsService = jest.fn(() => ({
      route: mockRoute,
    }));

    // Render with valid params
    render(
      <Directions
        origin="San Francisco"
        destination="Los Angeles"
        refresh={true}
        setRefresh={mockSetRefresh}
      />
    );

    // Verify directions service was called with correct params
    expect(mockRoute).toHaveBeenCalledTimes(1);
    expect(mockRoute.mock.calls[0][0]).toEqual({
      origin: 'San Francisco',
      destination: 'Los Angeles',
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });

    // Verify refresh state was reset
    expect(mockSetRefresh).toHaveBeenCalledWith(false);

    // Restore original implementation
    google.maps.DirectionsService = originalDirectionsService;
  });

  test('does not request directions when refresh is false', () => {
    // Mock google.maps.DirectionsService
    const mockRoute = jest.fn();
    const originalDirectionsService = google.maps.DirectionsService;

    // Replace with mock implementation
    google.maps.DirectionsService = jest.fn(() => ({
      route: mockRoute,
    }));

    // Render with refresh false
    render(
      <Directions
        origin="San Francisco"
        destination="Los Angeles"
        refresh={false}
        setRefresh={mockSetRefresh}
      />
    );

    // Verify directions service was not called
    expect(mockRoute).not.toHaveBeenCalled();

    // Restore original implementation
    google.maps.DirectionsService = originalDirectionsService;
  });
});
