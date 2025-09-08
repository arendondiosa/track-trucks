import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useMap } from '@vis.gl/react-google-maps';
import { FitMap } from '../components/FitMap';

// Mock the useMap hook
jest.mock('@vis.gl/react-google-maps', () => ({
  useMap: jest.fn(),
}));

describe('FitMap Component', () => {
  const mockMap = {
    fitBounds: jest.fn(),
  };

  const mockSetRefresh = jest.fn();

  // Mock Google Maps Geocoder
  const mockGeocoder = {
    geocode: jest.fn(),
  };

  // Mock Google Maps LatLngBounds
  const mockBounds = {
    extend: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useMap.mockReturnValue(mockMap);

    // Setup Google Maps API mocks
    global.google = {
      maps: {
        Geocoder: jest.fn(() => mockGeocoder),
        LatLngBounds: jest.fn(() => mockBounds),
      },
    };
  });

  test('does not geocode when origin or destination is empty', () => {
    render(
      <FitMap origin="" destination="Los Angeles" refresh={true} setRefresh={mockSetRefresh} />
    );

    expect(mockGeocoder.geocode).not.toHaveBeenCalled();
  });

  test('does not geocode when refresh is false', () => {
    render(
      <FitMap
        origin="San Francisco"
        destination="Los Angeles"
        refresh={false}
        setRefresh={mockSetRefresh}
      />
    );

    expect(mockGeocoder.geocode).not.toHaveBeenCalled();
  });

  test('geocodes cities and fits map bounds when all parameters are provided', () => {
    // Mock successful geocode responses
    mockGeocoder.geocode.mockImplementation((request, callback) => {
      const city = request.address;
      const mockLocation =
        city === 'San Francisco'
          ? { lat: 37.7749, lng: -122.4194 }
          : { lat: 34.0522, lng: -118.2437 };

      callback(
        [
          {
            geometry: {
              location: mockLocation,
            },
          },
        ],
        'OK'
      );
    });

    render(
      <FitMap
        origin="San Francisco"
        destination="Los Angeles"
        refresh={true}
        setRefresh={mockSetRefresh}
      />
    );

    // Should call geocode twice (for origin and destination)
    expect(mockGeocoder.geocode).toHaveBeenCalledTimes(2);
    expect(mockGeocoder.geocode.mock.calls[0][0]).toEqual({ address: 'San Francisco' });
    expect(mockGeocoder.geocode.mock.calls[1][0]).toEqual({ address: 'Los Angeles' });

    // Should extend bounds with both locations
    expect(mockBounds.extend).toHaveBeenCalledTimes(2);

    // Should fit map to bounds
    expect(mockMap.fitBounds).toHaveBeenCalledWith(mockBounds);

    // Should set refresh to false
    expect(mockSetRefresh).toHaveBeenCalledWith(false);
  });

  test('handles geocoder errors gracefully', () => {
    // Mock console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Mock failed geocode response
    mockGeocoder.geocode.mockImplementation((request, callback) => {
      callback([], 'ERROR');
    });

    render(
      <FitMap
        origin="Invalid City"
        destination="Another Invalid City"
        refresh={true}
        setRefresh={mockSetRefresh}
      />
    );

    // Should call geocode twice
    expect(mockGeocoder.geocode).toHaveBeenCalledTimes(2);

    // Should log errors
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith('Geocode error:', 'Invalid City', 'ERROR');

    // Should not extend bounds or fit map
    expect(mockBounds.extend).not.toHaveBeenCalled();
    expect(mockMap.fitBounds).not.toHaveBeenCalled();

    // Should set refresh to false
    expect(mockSetRefresh).toHaveBeenCalledWith(false);

    // Restore console.error
    console.error = originalConsoleError;
  });
});
