import { Product } from '@/types';
import { Card, Button, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      style={{ 
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '2px solid #3B82F6',
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
        display: 'flex',
        flexDirection: 'column'
      }}
      bodyStyle={{ 
        padding: '20px', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column'
      }}
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: 220, objectFit: 'cover', width: '100%' }}
        />
      }
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 20, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <Meta title={<span style={{ color: '#1E40AF', fontSize: '18px', fontWeight: '700' }}>{product.name}</span>} />
            <Tag style={{ backgroundColor: '#3B82F6', color: '#fff', border: 'none' }}>{product.category}</Tag>
          </div>
          <Meta description={<span style={{ color: '#666', fontSize: '14px' }}>{product.description}</span>} />
          <div style={{ marginTop: 16, fontSize: '24px', fontWeight: '800', color: '#3B82F6' }}>
            ₹{product.price.toLocaleString()}
          </div>
        </div>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => onAddToCart(product)}
          block
          size="large"
          style={{
            backgroundColor: '#1E40AF',
            borderColor: '#1E40AF',
            borderRadius: '12px',
            height: '48px',
            fontWeight: '700',
            fontSize: '16px'
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}