import { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps';
import { Polyline } from '../utils/polyline';

function Directions({ origin, destination }) {
  const map = useMap();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (!map) return;

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
          console.log('Directions result:', result);
          setRoutes(result.routes.slice(0, 3)); // take max 3 routes
        }
      }
    );
  }, [map, origin, destination]);

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
}

const ContentLayout = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <Layout>
      <Content style={{ margin: '0' }}>
        <div
          style={{
            maxWidth: '100%',
          }}
        >
          <APIProvider apiKey={API_KEY}>
            <Map
              style={{ width: '100%', height: '100vh' }}
              defaultCenter={{ lat: 39.5, lng: -98.35 }} // center USA
              defaultZoom={5}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <Directions origin="New York, NY" destination="Washington, DC" />
            </Map>
          </APIProvider>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentLayout;
