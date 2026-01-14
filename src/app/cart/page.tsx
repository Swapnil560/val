'use client';

import { useSnapshot } from 'valtio';
import { cartStore, cartActions } from '@/stores/cartStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const cartSnap = useSnapshot(cartStore);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <header style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
              Ecommerce
            </Link>
            <Link 
              href="/"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '12px',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              Back to Shop
            </Link>
          </div>
        </header>
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '32px', color: '#fff' }}>Shopping Cart</h1>
          <div style={{ textAlign: 'center', padding: '48px 0' }}>Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
            Ecommerce
          </Link>
          <Link 
            href="/"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '12px',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            Back to Shop
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '32px', color: '#fff' }}>Shopping Cart</h1>

        {cartSnap.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px', color: '#fff' }}>Your cart is empty</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>Add some products to get started</p>
            <Link 
              href="/"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {cartSnap.items.map((item, index) => (
                <div key={item.product.id} style={{
                  padding: '24px',
                  borderBottom: index !== cartSnap.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#fff' }}>{item.product.name}</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>{item.product.description}</p>
                      <p style={{ color: '#667eea', fontWeight: '600' }}>₹{item.product.price.toLocaleString()}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => cartActions.updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        -
                      </button>
                      <span style={{ width: '48px', textAlign: 'center', fontWeight: '600', color: '#fff' }}>{item.quantity}</span>
                      <button
                        onClick={() => cartActions.updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '600', fontSize: '1.125rem', color: '#fff' }}>₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      <button
                        onClick={() => cartActions.removeItem(item.product.id)}
                        style={{
                          color: '#ff6b6b',
                          background: 'none',
                          border: 'none',
                          fontSize: '0.875rem',
                          marginTop: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#ff5252';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#ff6b6b';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.125rem', color: '#fff' }}>Total Items:</span>
                <span style={{ fontWeight: '600', color: '#fff' }}>{cartSnap.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff' }}>Total Amount:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>₹{cartSnap.total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={cartActions.clearCart}
                  style={{
                    flex: 1,
                    background: '#ff6b6b',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ff5252';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ff6b6b';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Clear Cart
                </button>
                <button 
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}