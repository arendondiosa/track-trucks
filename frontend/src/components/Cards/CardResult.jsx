import { Card, Avatar, List } from 'antd';
import {
  BankOutlined,
  BuildOutlined,
  ShopOutlined,
  HomeOutlined,
  GlobalOutlined,
  CarOutlined,
  RocketOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import ModalResult from './ModalResult';
import ResultItem from './ResultItem';

// Helper function to get a company icon based on index
const getCompanyIcon = index => {
  const icons = [
    <BankOutlined />,
    <BuildOutlined />,
    <ShopOutlined />,
    <GlobalOutlined />,
    <CarOutlined />,
    <RocketOutlined />,
    <ContainerOutlined />,
    <HomeOutlined />,
  ];

  return icons[index % icons.length];
};

// Helper function to get a color based on index
const getCompanyColor = index => {
  const colors = [
    '#1890ff', // Blue
    '#52c41a', // Green
    '#faad14', // Yellow
    '#13c2c2', // Cyan
    '#722ed1', // Purple
    '#eb2f96', // Pink
    '#fa541c', // Orange
    '#2f54eb', // Indigo
  ];

  return colors[index % colors.length];
};

const CardResult = ({ carries }) => {
  return (
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
          <ResultItem
            item={item}
            index={index}
            icon={getCompanyIcon(index)}
            color={getCompanyColor(index)}
          />
        )}
      />
    </Card>
  );
};

export default CardResult;
