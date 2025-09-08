import React, { useState } from 'react';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import truckLogo from '../assets/truck-logo.svg';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Carrier Search', '1', <SearchOutlined />),
  getItem('Login', '2', <UserOutlined />),
];

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '16px 0' : '16px 24px',
            height: '64px',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <img src={truckLogo} alt="Track Trucks Logo" style={{ height: '28px' }} />
          {!collapsed && (
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                marginLeft: '8px',
                color: 'white',
              }}
            >
              TrackTrucks
            </Typography.Title>
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </>
  );
};

export default Navbar;
