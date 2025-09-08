import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

export function FitMap({ origin, destination, refresh, setRefresh }) {
  const map = useMap();

  useEffect(() => {
    if (!map || origin === '' || destination === '' || !refresh) return;

    const bounds = new google.maps.LatLngBounds();
    const geocoder = new google.maps.Geocoder();

    const cities = [origin, destination];

    cities.forEach(city => {
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === 'OK' && results[0]) {
          bounds.extend(results[0].geometry.location);
          map.fitBounds(bounds);
        } else {
          console.error('Geocode error:', city, status);
        }
      });
    });
    setRefresh(false);
  }, [map, origin, destination, refresh]);

  return null;
}
