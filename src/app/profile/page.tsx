'use client';

import { useSnapshot } from 'valtio';
import { authStore, authActions } from '@/stores/authStore';
import { proxy } from 'valtio';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

// Profile form state using Valtio
const profileFormState = proxy({
  name: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  showCurrentPassword: false,
  showNewPassword: false,
  showConfirmPassword: false
});

export default function ProfilePage() {
  const authSnap = useSnapshot(authStore);
  const formSnap = useSnapshot(profileFormState);

  // Check auth on component mount
  if (typeof window !== 'undefined' && !authSnap.isAuthenticated) {
    authActions.checkAuth();
  }

  // Initialize form with current user data
  if (formSnap.name === '' && authSnap.currentUser) {
    profileFormState.name = authSnap.currentUser;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formSnap.newPassword && formSnap.newPassword !== formSnap.confirmPassword) {
      authStore.error = 'New passwords do not match';
      return;
    }

    authActions.updateProfile(
      formSnap.name,
      formSnap.currentPassword,
      formSnap.newPassword || undefined
    );

    // Clear form after successful update
    setTimeout(() => {
      if (!authStore.error) {
        profileFormState.currentPassword = '';
        profileFormState.newPassword = '';
        profileFormState.confirmPassword = '';
      }
    }, 100);
  };

  // Show login message if not authenticated
  if (!authSnap.isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{ color: '#fff', marginBottom: '16px' }}>Please login to access profile</h1>
          <Link 
            href="/login"
            style={{
              background: '#3B82F6',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block',
              marginRight: '12px'
            }}
          >
            Login
          </Link>
          <Link 
            href="/"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
            Profile Settings
          </h1>
          <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
            ← Back to Shop
          </Link>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {authSnap.error && (
            <div style={{
              background: '#ff6b6b',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              {authSnap.error}
              <button 
                onClick={authActions.clearError}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#fff', 
                  float: 'right',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleUpdateProfile}>
            {/* Personal Information */}
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Personal Information</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Name</label>
              <input
                type="text"
                value={formSnap.name}
                onChange={(e) => profileFormState.name = e.target.value}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            {/* Password Section */}
            <h3 style={{ color: '#fff', marginBottom: '16px', marginTop: '32px' }}>Change Password</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Current Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={formSnap.showCurrentPassword ? 'text' : 'password'}
                  value={formSnap.currentPassword}
                  onChange={(e) => profileFormState.currentPassword = e.target.value}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => profileFormState.showCurrentPassword = !profileFormState.showCurrentPassword}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {formSnap.showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>New Password (optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={formSnap.showNewPassword ? 'text' : 'password'}
                  value={formSnap.newPassword}
                  onChange={(e) => profileFormState.newPassword = e.target.value}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => profileFormState.showNewPassword = !profileFormState.showNewPassword}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {formSnap.showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={formSnap.showConfirmPassword ? 'text' : 'password'}
                  value={formSnap.confirmPassword}
                  onChange={(e) => profileFormState.confirmPassword = e.target.value}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '16px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => profileFormState.showConfirmPassword = !profileFormState.showConfirmPassword}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {formSnap.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authSnap.loading}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                background: '#3B82F6',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                cursor: authSnap.loading ? 'not-allowed' : 'pointer',
                opacity: authSnap.loading ? 0.7 : 1
              }}
            >
              {authSnap.loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}