import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Spin } from 'antd';
import { UserOutlined, ShopOutlined, CodeSandboxOutlined, ShoppingCartOutlined, FileTextOutlined, AccountBookOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import request from '@/request/request';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';

import VehicleSalesGraph from '@/components/Chart/VehicleSalesGraph';
import InventoryGraph from '@/components/Chart/InventoryGraph';
import RevenueProfitGraph from '@/components/Chart/RevenueProfitGraph';
import EmployeeProductivityGraph from '@/components/Chart/EmployeeProductivityGraph';

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
    chartData: {
      vehicleSales: [],
      inventory: [],
      monthlyRevenue: [],
      employees: []
    }
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
      icon: <UserOutlined style={{ color: '#60a5fa', fontSize: 24 }} />,
      borderColor: 'rgba(96, 165, 250, 0.3)',
      iconBg: 'rgba(96, 165, 250, 0.1)',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Products',
      value: data.totalProducts,
      icon: <ShopOutlined style={{ color: '#4ade80', fontSize: 24 }} />,
      borderColor: 'rgba(74, 222, 128, 0.3)',
      iconBg: 'rgba(74, 222, 128, 0.1)',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Raw Materials',
      value: data.totalRawMaterials,
      icon: <CodeSandboxOutlined style={{ color: '#f0ae77', fontSize: 24 }} />,
      borderColor: 'rgba(240, 174, 119, 0.3)',
      iconBg: 'rgba(240, 174, 119, 0.1)',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Sales Orders',
      value: data.totalSalesOrders,
      icon: <ShoppingCartOutlined style={{ color: '#c084fc', fontSize: 24 }} />,
      borderColor: 'rgba(192, 132, 252, 0.3)',
      iconBg: 'rgba(192, 132, 252, 0.1)',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Purchase Products',
      value: data.totalPurchaseOrders,
      icon: <ShopOutlined style={{ color: '#f472b6', fontSize: 24 }} />,
      borderColor: 'rgba(244, 114, 182, 0.3)',
      iconBg: 'rgba(244, 114, 182, 0.1)',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Invoices',
      value: data.totalInvoices,
      icon: <FileTextOutlined style={{ color: '#2dd4bf', fontSize: 24 }} />,
      borderColor: 'rgba(45, 212, 191, 0.3)',
      iconBg: 'rgba(45, 212, 191, 0.1)',
      showFor: ['owner', 'admin', 'product']
    },
    {
      title: 'Total Revenue',
      value: `₹${data.totalRevenue.toLocaleString()}`,
      icon: <RiseOutlined style={{ color: '#4ade80', fontSize: 24 }} />,
      borderColor: 'rgba(74, 222, 128, 0.3)',
      iconBg: 'rgba(74, 222, 128, 0.1)',
      showFor: ['owner', 'admin', 'finance']
    },
    {
      title: 'Total Expenses',
      value: `₹${data.totalExpenses.toLocaleString()}`,
      icon: <FallOutlined style={{ color: '#f87171', fontSize: 24 }} />,
      borderColor: 'rgba(248, 113, 113, 0.3)',
      iconBg: 'rgba(248, 113, 113, 0.1)',
      showFor: ['owner', 'admin', 'finance']
    },
    {
      title: 'Total Profit',
      value: `₹${data.totalProfit.toLocaleString()}`,
      icon: <AccountBookOutlined style={{ color: '#f0ae77', fontSize: 24 }} />,
      borderColor: 'rgba(240, 174, 119, 0.3)',
      iconBg: 'rgba(240, 174, 119, 0.1)',
      showFor: ['owner', 'admin', 'finance']
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24, color: '#ffffff' }}>System Dashboard</h2>
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
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${card.borderColor}`,
                    transition: 'all 0.3s ease',
                  }}
                  hoverable
                >
                  <Statistic
                    title={<span style={{ fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,0.65)' }}>{card.title}</span>}
                    value={card.value}
                    prefix={card.icon}
                    valueStyle={{ fontWeight: 'bold', marginTop: 8, color: '#ffffff' }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>

        {['owner', 'admin', 'finance'].includes(role) && (
          <div style={{ marginTop: 40 }}>
            <h3 style={{ marginBottom: 24, color: '#f0ae77' }}>Analytics & Reports</h3>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <VehicleSalesGraph data={data.chartData.vehicleSales} />
              </Col>
              <Col xs={24} md={12}>
                <InventoryGraph data={data.chartData.inventory} />
              </Col>
              <Col xs={24} md={12}>
                <RevenueProfitGraph data={data.chartData.monthlyRevenue} />
              </Col>
              <Col xs={24} md={12}>
                <EmployeeProductivityGraph data={data.chartData.employees} />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    </div>
  );
}
