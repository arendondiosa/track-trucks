import { useState, useEffect } from 'react';
import { Layout, Form, Button, Card, Select } from 'antd';
const { Content} = Layout;

import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps';
import Directions from './Directions';
import { mapStyle } from '../utils/map';
import apiService from '../utils/service';
import { FitMap } from './FitMap';

const ContentLayout = () => {
  const [form] = Form.useForm();
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [cities, setCities] = useState({});
  const [refresh, setRefresh] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [originPoint, setOriginPoint] = useState('');
  const [destinationPoint, setDestinationPoint] = useState('');
  const [originCities, setOriginCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await apiService.getCities();
        setCities(citiesData);
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const origins = Object.keys(cities);
    setOriginCities(origins.map(city => ({ value: city, label: <span>{city}</span> })));
  }, [cities]);

  const onChangeOrigin = (value) => {
    setOriginPoint(value);
    setDestinationPoint(undefined);
    // Update destination cities based on selected origin
    if (cities[value]) {
      setDestinationCities(cities[value].map(city => ({ value: city, label: <span>{city}</span> })));
    } else {
      setDestinationCities([]);
    }
  }

  const onChangeDestination = (value) => {
    setDestinationPoint(value);

  }

  const onSearch = async () => {
    try {
      const values = await apiService.getFilteredTrips({
        source_city: originPoint,
        destination_city: destinationPoint
      });

      setRefresh(true);
      console.log('Filtered trips:', values);
    } catch (errorInfo) {
      console.error('Failed to submit form:', errorInfo);
    }
  }

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
              <FitMap origin={originPoint} destination={destinationPoint} refresh={refresh} setRefresh={setRefresh} />
              <Directions origin={originPoint} destination={destinationPoint} refresh={refresh} setRefresh={setRefresh} />
            </Map>

            <div
              style={{
                position: "absolute",
                top: 0,
                zIndex: 1000,
                width: 300,
                margin: 15
              }}
            >
              <Card
                size="small"
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  margin: 0,
                  position: "relative",
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                >
                  <Form.Item
                    label="Origin"
                    name="origin"
                    rules={[{ required: true, message: "Enter origin" }]}
                  >
                    <Select options={originCities} placeholder="Select origin" onChange={onChangeOrigin} />
                  </Form.Item>

                  <Form.Item
                    label="Destination"
                    name="destination"
                    rules={[{ required: true, message: "Enter destination" }]}
                  >
                    <Select value={destinationPoint} options={destinationCities} placeholder="Select destination" onChange={onChangeDestination} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={onSearch} disabled={ originPoint === '' || destinationPoint === '' } block>
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>

          </APIProvider>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentLayout;
