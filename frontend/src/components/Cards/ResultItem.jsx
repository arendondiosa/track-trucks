import { Card, Avatar, List } from 'antd';
import ModalResult from './ModalResult';
import { useState } from 'react';

const ResultItem = ({ item, icon, color }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <List.Item onClick={() => setIsModalOpen(!isModalOpen)}>
        <List.Item.Meta
          avatar={
            <Avatar
              icon={icon}
              style={{
                backgroundColor: color,
                color: '#fff',
              }}
            />
          }
          title={item.name}
          description={<p>{item.trucks_per_day} Trucks/day</p>}
        />
      </List.Item>
      <ModalResult
        title={`${item.name} (${item.trucks_per_day} Trucks/day)`}
        items={item.trucks}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ResultItem;
