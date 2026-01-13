'use client';

import { useSnapshot } from 'valtio';
import { productStore, productActions } from '@/stores/productStore';
import { cartActions } from '@/stores/cartStore';
import { proxy } from 'valtio';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { Row, Col, Typography, Spin } from 'antd';

const { Title, Text } = Typography;

// UI state for modal
const uiState = proxy({
  isCartOpen: false
});

const categories = ['All', 'Electronics', 'Clothing', 'Footwear', 'Accessories', 'Home'];

export default function Home() {
  const productSnap = useSnapshot(productStore);
  const uiSnap = useSnapshot(uiState);

  // Load products on first render
  if (productSnap.products.length === 0 && !productSnap.loading) {
    productActions.loadProducts();
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <Header onCartClick={() => uiState.isCartOpen = true} />
      
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 24px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Search and Filter Section */}
        <div style={{ 
          marginBottom: '24px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{ marginBottom: '12px', maxWidth: '320px', margin: '0 auto 12px' }}>
            <SearchBar
              searchQuery={productSnap.searchQuery}
              onSearch={productActions.searchProducts}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CategoryFilter
              categories={categories}
              selectedCategory={productSnap.selectedCategory}
              onCategoryChange={productActions.filterByCategory}
            />
          </div>
        </div>

        {/* Products Section */}
        <div style={{ 
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <Title 
            level={2} 
            style={{ 
              color: '#fff',
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '8px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Featured Products
          </Title>
          <Text style={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px'
          }}>
            {productSnap.filteredProducts.length} products found
            {productSnap.searchQuery && ` for "${productSnap.searchQuery}"`}
            {productSnap.selectedCategory !== 'All' && ` in ${productSnap.selectedCategory}`}
          </Text>
        </div>
        
        {productSnap.loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 0',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px'
          }}>
            <Spin size="large" style={{ color: '#fff' }} />
            <div style={{ marginTop: '24px' }}>
              <Text style={{ color: '#fff', fontSize: '18px' }}>Loading amazing products...</Text>
            </div>
          </div>
        ) : productSnap.filteredProducts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 0',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px'
          }}>
            <Title level={3} style={{ color: '#fff' }}>No products found</Title>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Try adjusting your search or filter</Text>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {productSnap.filteredProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id} style={{ display: 'flex' }}>
                <ProductCard
                  product={product}
                  onAddToCart={cartActions.addItem}
                />
              </Col>
            ))}
          </Row>
        )}
      </main>
    </div>
  );
}