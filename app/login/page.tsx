'use client';

import { useSnapshot } from 'valtio';
import { authStore, authActions } from '@/stores/authStore';
import { proxy } from 'valtio';
import { Card, Form, Input, Button, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const { Title, Text } = Typography;

// Login form state using Valtio
const loginFormState = proxy({
  name: '',
  password: ''
});

export default function LoginPage() {
  const authSnap = useSnapshot(authStore);
  const formSnap = useSnapshot(loginFormState);
  const router = useRouter();

  useEffect(() => {
    if (authSnap.isAuthenticated) {
      router.push('/');
    }
  }, [authSnap.isAuthenticated, router]);

  const handleSubmit = () => {
    if (formSnap.name && formSnap.password) {
      authActions.login(formSnap.name, formSnap.password);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: '8px' }}>
            Welcome Back
          </Title>
          <Text type="secondary" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Sign in to your account</Text>
        </div>

        {authSnap.error && (
          <Alert
            message={authSnap.error}
            type="error"
            showIcon
            closable
            onClose={authActions.clearError}
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            label={<span style={{ color: '#fff' }}>Name</span>}
            required
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your name"
              value={formSnap.name}
              onChange={(e) => loginFormState.name = e.target.value}
              style={{ borderRadius: '12px' }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#fff' }}>Password</span>}
            required
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              value={formSnap.password}
              onChange={(e) => loginFormState.password = e.target.value}
              style={{ borderRadius: '12px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={authSnap.loading}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderColor: 'transparent',
                borderRadius: '12px',
                height: '48px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!authSnap.loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!authSnap.loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {authSnap.loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Don't have an account? </Text>
          <Link href="/register" style={{ color: '#667eea', textDecoration: 'none' }}>
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}