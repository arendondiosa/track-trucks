from app.managers.trips import TripsManager


class TripsController:
    def __init__(self):
        pass

    def get_all_trips(self):
        all_trips = TripsManager.load_trips_data()
        if "routes" in all_trips:
            return all_trips["routes"]
        return []

    def get_trips_by_filters(self, filters: dict):
        all_trips = TripsManager.load_trips_data()
        filtered_routes = []

        if "routes" in all_trips:
            routes = all_trips["routes"]

            # Start with all routes
            filtered_routes = routes.copy()

            # Filter by source city if provided
            if "source_city" in filters and filters["source_city"]:
                filtered_routes = [
                    route
                    for route in filtered_routes
                    if route["origin"].lower() == filters["source_city"].lower()
                ]

            # Filter by destination city if provided
            if "destination_city" in filters and filters["destination_city"]:
                dest_city = filters["destination_city"].lower()
                filtered_routes = [
                    route
                    for route in filtered_routes
                    if route["destination"].lower() == dest_city
                ]

        return filtered_routes
