import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Spin } from 'antd';
import { UserOutlined, ShopOutlined, CodeSandboxOutlined, ShoppingCartOutlined, FileTextOutlined, AccountBookOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import request from '@/request/request';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';

export default function DashboardModule() {
  const translate = useLanguage();
  const { current } = useSelector(selectAuth);
  const role = current?.role || 'owner';

  const [data, setData] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalRawMaterials: 0,
    totalSalesOrders: 0,
    totalPurchaseOrders: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    totalProfit: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      try {
        const res = await request.get({ entity: 'dashboard/summary' });
        if (res && res.success) {
          setData(res.result);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard metrics');
      }
      setLoading(false);
    };

    fetchDashboardStats();
  }, []);

  const metricCards = [
    {
      title: 'Total Customers',
      value: data.totalCustomers,
      icon: <UserOutlined style={{ color: '#1890ff', fontSize: 24 }} />,
      color: '#e6f7ff',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Products',
      value: data.totalProducts,
      icon: <ShopOutlined style={{ color: '#52c41a', fontSize: 24 }} />,
      color: '#f6ffed',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Raw Materials',
      value: data.totalRawMaterials,
      icon: <CodeSandboxOutlined style={{ color: '#faad14', fontSize: 24 }} />,
      color: '#fffbe6',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Sales Orders',
      value: data.totalSalesOrders,
      icon: <ShoppingCartOutlined style={{ color: '#722ed1', fontSize: 24 }} />,
      color: '#f9f0ff',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Purchase Products',
      value: data.totalPurchaseOrders,
      icon: <ShopOutlined style={{ color: '#eb2f96', fontSize: 24 }} />,
      color: '#fff0f6',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Invoices',
      value: data.totalInvoices,
      icon: <FileTextOutlined style={{ color: '#13c2c2', fontSize: 24 }} />,
      color: '#e6fffb',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Revenue',
      value: `₹${data.totalRevenue.toLocaleString()}`,
      icon: <RiseOutlined style={{ color: '#52c41a', fontSize: 24 }} />,
      color: '#f6ffed',
      showFor: ['owner', 'admin', 'finance']
    },
    {
      title: 'Total Expenses',
      value: `₹${data.totalExpenses.toLocaleString()}`,
      icon: <FallOutlined style={{ color: '#ff4d4f', fontSize: 24 }} />,
      color: '#fff2f0',
      showFor: ['owner', 'admin', 'finance']
    },
    {
      title: 'Total Profit',
      value: `₹${data.totalProfit.toLocaleString()}`,
      icon: <AccountBookOutlined style={{ color: '#1890ff', fontSize: 24 }} />,
      color: '#e6f7ff',
      showFor: ['owner', 'admin', 'finance']
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>System Dashboard</h2>
      <Spin spinning={loading} size="large">
        <Row gutter={[24, 24]}>
          {metricCards.map((card, index) => {
            if (!card.showFor.includes(role)) return null;

            return (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    backgroundColor: card.color
                  }}
                >
                  <Statistic
                    title={<span style={{ fontWeight: 600, fontSize: 16 }}>{card.title}</span>}
                    value={card.value}
                    prefix={card.icon}
                    valueStyle={{ fontWeight: 'bold', marginTop: 8 }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Spin>
    </div>
  );
}
