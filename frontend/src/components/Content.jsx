import { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps';
import Directions from './Directions';
import { mapStyle } from '../utils/map';

function FitMap({ origin, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map || origin === '' || destination === '') return;

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
  }, [map, origin, destination]);

  return null;
}

const ContentLayout = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [originPoint, setOriginPoint] = useState('');
  const [destinationPoint, setDestinationPoint] = useState('');

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
              options={mapStyle}
            >
              <FitMap origin={originPoint} destination={destinationPoint} />
              <Directions origin={originPoint} destination={destinationPoint} />
            </Map>
          </APIProvider>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentLayout;
