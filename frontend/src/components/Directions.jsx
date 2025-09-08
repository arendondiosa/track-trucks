import { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { useMap, Marker } from '@vis.gl/react-google-maps';
import { Polyline } from '../utils/polyline';

const Directions = ({ origin, destination, refresh, setRefresh }) => {
  const map = useMap();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (!map || origin === '' || destination === '' || !refresh) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setRoutes(result.routes.slice(0, 3)); // take max 3 routes
        }
      }
    );

    setRefresh(false);
  }, [map, origin, destination, refresh, setRefresh]);

  return (
    <>
      {routes.map((route, i) => (
        <Polyline
          key={i}
          encodedPath={route.overview_polyline}
          strokeColor={i === 0 ? 'blue' : i === 1 ? 'green' : 'red'}
          strokeWeight={3}
        />
      ))}

      {/* Markers for cities */}
      <Marker position={routes[0]?.legs[0]?.start_location} />
      <Marker position={routes[0]?.legs[0]?.end_location} />
    </>
  );
};

export default Directions;
