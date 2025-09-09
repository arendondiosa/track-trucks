import React from 'react';
import { Modal, Card, Descriptions, Tag, Typography, Space, Divider } from 'antd';
import {
  CarOutlined,
  IdcardOutlined,
  NumberOutlined,
  BankOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const ModalResult = ({ title, items, isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Format timestamp to more readable format
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <>
      <Modal
        title={title}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {items.map((item, index) => (
            <Card
              key={`truck-${item.id}-${index}`}
              hoverable
              style={{
                marginBottom: 16,
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={4}>
                  <CarOutlined /> Truck #{item.id}
                  <Tag color="blue" style={{ marginLeft: 12 }}>
                    {item.plate_id}
                  </Tag>
                </Title>

                <Divider style={{ margin: '12px 0' }} />

                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item
                    label={
                      <>
                        <IdcardOutlined /> License Plate
                      </>
                    }
                    labelStyle={{ fontWeight: 'bold' }}
                  >
                    {item.plate_id}
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <>
                        <NumberOutlined /> USDOT Number
                      </>
                    }
                    labelStyle={{ fontWeight: 'bold' }}
                  >
                    {item.usdot_number}
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <>
                        <BankOutlined /> Carrier ID
                      </>
                    }
                    labelStyle={{ fontWeight: 'bold' }}
                  >
                    {item.carrier_id}
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <>
                        <ClockCircleOutlined /> First Observation
                      </>
                    }
                    labelStyle={{ fontWeight: 'bold' }}
                  >
                    {formatTimestamp(item.first_observation)}
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <>
                        <HistoryOutlined /> Last Observation
                      </>
                    }
                    labelStyle={{ fontWeight: 'bold' }}
                  >
                    {formatTimestamp(item.last_observation)}
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          ))}
        </Space>
      </Modal>
    </>
  );
};

export default ModalResult;
