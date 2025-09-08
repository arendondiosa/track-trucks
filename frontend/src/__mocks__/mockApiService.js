/**
 * Mock API service for testing
 */

// Mock city data
const mockCitiesData = {
  'New York': ['Washington DC', 'Boston'],
  'San Francisco': ['Los Angeles', 'Seattle'],
  Chicago: ['Denver', 'Detroit'],
};

// Mock trips data
const mockTripsData = [
  {
    id: 1,
    origin: 'New York',
    destination: 'Washington DC',
    carriers: [
      {
        id: 101,
        name: 'Knight-Swift Transport Services',
        trucks_per_day: 10,
      },
    ],
  },
  {
    id: 2,
    origin: 'San Francisco',
    destination: 'Los Angeles',
    carriers: [
      {
        id: 201,
        name: 'XPO Logistics',
        trucks_per_day: 9,
      },
    ],
  },
  {
    id: 3,
    origin: 'Chicago',
    destination: 'Denver',
    carriers: [
      {
        id: 301,
        name: 'UPS Inc.',
        trucks_per_day: 11,
      },
    ],
  },
];

/**
 * API service object with mock methods for testing
 */
const mockApiService = {
  /**
   * Mock method to fetch cities
   */
  getCities: jest.fn().mockResolvedValue(mockCitiesData),

  /**
   * Mock method to fetch all trips
   */
  getAllTrips: jest.fn().mockResolvedValue(mockTripsData),

  /**
   * Mock method to fetch filtered trips
   */
  getFilteredTrips: jest.fn((filters = {}) => {
    let filteredTrips = [...mockTripsData];

    if (filters.source_city) {
      filteredTrips = filteredTrips.filter(
        trip => trip.origin.toLowerCase() === filters.source_city.toLowerCase()
      );
    }

    if (filters.destination_city) {
      filteredTrips = filteredTrips.filter(
        trip => trip.destination.toLowerCase() === filters.destination_city.toLowerCase()
      );
    }

    return Promise.resolve(filteredTrips);
  }),
};

export default mockApiService;
export { mockCitiesData, mockTripsData };
