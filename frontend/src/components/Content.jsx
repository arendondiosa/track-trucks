import { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps';
import Directions from './Directions';
import { mapStyle } from '../utils/map';

function FitMap() {
  const map = useMap(); // gives you access to the map instance

  useEffect(() => {
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();

    bounds.extend({ lat: 4.60971, lng: -74.08175 });
    bounds.extend({ lat: 6.25184, lng: -75.56359 });

    map.fitBounds(bounds); // auto-zoom/center
  }, [map]);

  return null; // no UI, just runs once
}


const ContentLayout = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [originPoint, setOriginPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);

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
              {/* <FitMap /> */}
              <Directions origin="New York" destination="Mexico" />
            </Map>
          </APIProvider>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentLayout;
