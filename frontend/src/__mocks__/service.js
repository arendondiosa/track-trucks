/**
 * Mock service.js for testing
 */

// Define mock API URL for tests - hardcoded for test environment
const API_BASE_URL = 'http://test-api-url.com/api/v1.0';

/**
 * Generic error handler for API requests
 * @param {Response} response - Fetch response object
 * @returns {Promise} - JSON response if successful, throws error otherwise
 */
const handleResponse = async response => {
  if (!response.ok) {
    // Get error details from response if available
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || `API Error: ${response.status}`;
    } catch (e) {
      errorMessage = `API Error: ${response.status} ${response.statusText}. ${e}`;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * API service object with methods for each endpoint
 */
const apiService = {
  /**
   * Fetch all available cities and their connections
   * @returns {Promise<Object>} - Object with cities as keys and arrays of destinations as values
   */
  getCities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trips/cities`);
      return handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      throw error;
    }
  },

  /**
   * Get all trips
   * @returns {Promise<Array>} - Array of trip objects
   */
  getAllTrips: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trips/`);
      return handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      throw error;
    }
  },

  /**
   * Get filtered trips based on source and/or destination cities
   * @param {Object} filters - Filter criteria
   * @param {string} [filters.source_city] - Optional source city filter
   * @param {string} [filters.destination_city] - Optional destination city filter
   * @returns {Promise<Array>} - Array of filtered trip objects
   */
  getFilteredTrips: async (filters = {}) => {
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.source_city) {
        queryParams.append('source_city', filters.source_city);
      }
      if (filters.destination_city) {
        queryParams.append('destination_city', filters.destination_city);
      }

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/trips/filter${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      return handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch filtered trips:', error);
      throw error;
    }
  },
};

export default apiService;
