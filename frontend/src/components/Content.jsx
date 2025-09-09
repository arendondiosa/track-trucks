import { useState, useEffect } from 'react';
import { Layout, Form, Button, Card, Select } from 'antd';
const { Content } = Layout;

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Directions from './Directions';
import { mapStyle } from '../utils/map';
import apiService from '../utils/service';
import { FitMap } from './FitMap';
import CardForm from './Cards/CardForm';

const ContentLayout = () => {
  const [form] = Form.useForm();
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [cities, setCities] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [trips, setTrips] = useState([]);
  const [originPoint, setOriginPoint] = useState(undefined);
  const [destinationPoint, setDestinationPoint] = useState(undefined);
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

  const onChangeOrigin = value => {
    setOriginPoint(value);
    // Update destination cities based on selected origin
    if (cities[value]) {
      setDestinationCities(
        cities[value].map(city => ({ value: city, label: <span>{city}</span> }))
      );
    } else {
      setDestinationCities([]);
    }
    setDestinationPoint(undefined);
    form.resetFields(['destination']);
  };

  const onChangeDestination = value => {
    setDestinationPoint(value);
  };

  const onSearch = async () => {
    try {
      const values = await apiService.getFilteredTrips({
        source_city: originPoint,
        destination_city: destinationPoint,
      });

      setRefresh(true);
      setTrips(values);
    } catch (errorInfo) {
      console.error('Failed to submit form:', errorInfo);
    }
  };

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
              <FitMap
                origin={originPoint}
                destination={destinationPoint}
                refresh={refresh}
                setRefresh={setRefresh}
              />
              <Directions
                origin={originPoint}
                destination={destinationPoint}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </Map>

            <CardForm
              form={form}
              originCities={originCities}
              destinationCities={destinationCities}
              onChangeOrigin={onChangeOrigin}
              onChangeDestination={onChangeDestination}
              originPoint={originPoint}
              destinationPoint={destinationPoint}
              onSearch={onSearch}
              trips={trips}
            />
          </APIProvider>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentLayout;
