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

        return all_trips
