import { Layout } from 'antd';
import Navbar from './Navbar';
import ContentLayout from './Content';

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <ContentLayout />
    </Layout>
  );
};

export default Dashboard;
