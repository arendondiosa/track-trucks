import { Form, Button, Card, Select, Avatar, List } from 'antd';
import { useEffect, useState } from 'react';

const CardForm = ({
  form,
  originCities,
  destinationCities,
  onChangeOrigin,
  onChangeDestination,
  originPoint,
  destinationPoint,
  onSearch,
  trips,
}) => {
  const [carries, setCarries] = useState([]);

  useEffect(() => {
    if (originPoint === undefined || destinationPoint === undefined) {
      setCarries([]);
    }
  }, [originPoint, destinationPoint]);

  useEffect(() => {
    let allCarriers = [];

    trips.forEach(trip => {
      if (trip.carriers && Array.isArray(trip.carriers)) {
        allCarriers = allCarriers.concat(trip.carriers);
      }
    });
    setCarries([...new Set(allCarriers)]);
  }, [trips]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        width: 300,
        margin: 15,
      }}
    >
      <Card
        size="small"
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          margin: 0,
          position: 'relative',
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Origin"
            name="origin"
            rules={[{ required: true, message: 'Enter origin' }]}
          >
            <Select
              options={originCities}
              value={originPoint}
              placeholder="Select origin"
              onChange={onChangeOrigin}
            />
          </Form.Item>

          <Form.Item
            label="Destination"
            name="destination"
            rules={[{ required: true, message: 'Enter destination' }]}
          >
            <Select
              value={destinationPoint}
              options={destinationCities}
              placeholder="Select destination"
              onChange={onChangeDestination}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onSearch}
              disabled={originPoint === undefined || destinationPoint === undefined}
              block
            >
              Search
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        size="small"
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          marginTop: 13,
          position: 'relative',
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={carries}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={item.name}
                description={<p>{item.trucks_per_day} Trucks/day</p>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default CardForm;
