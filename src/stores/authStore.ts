import { proxy } from 'valtio';

interface User {
  name: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
  loading: boolean;
  error: string | null;
}

export const authStore = proxy<AuthState>({
  isAuthenticated: false,
  currentUser: null,
  loading: false,
  error: null,
});

export const authActions = {
  login: (name: string, password: string) => {
    authStore.loading = true;
    authStore.error = null;

    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const user = users.find(u => u.name === name && u.password === password);

    if (user) {
      authStore.isAuthenticated = true;
      authStore.currentUser = name;
      localStorage.setItem('currentUser', name);
    } else {
      authStore.error = 'Invalid credentials';
    }
    
    authStore.loading = false;
  },

  register: (name: string, password: string) => {
    authStore.loading = true;
    authStore.error = null;

    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    
    if (users.find(u => u.name === name)) {
      authStore.error = 'User already exists';
      authStore.loading = false;
      return;
    }

    users.push({ name, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    authStore.isAuthenticated = true;
    authStore.currentUser = name;
    localStorage.setItem('currentUser', name);
    authStore.loading = false;
  },

  logout: () => {
    authStore.isAuthenticated = false;
    authStore.currentUser = null;
    localStorage.removeItem('currentUser');
  },

  checkAuth: () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      authStore.isAuthenticated = true;
      authStore.currentUser = currentUser;
    }
  },

  updateProfile: (newName: string, currentPassword: string, newPassword?: string) => {
    authStore.loading = true;
    authStore.error = null;

    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const userIndex = users.findIndex(u => u.name === authStore.currentUser);
    
    if (userIndex === -1) {
      authStore.error = 'User not found';
      authStore.loading = false;
      return;
    }

    const user = users[userIndex];
    
    if (user.password !== currentPassword) {
      authStore.error = 'Current password is incorrect';
      authStore.loading = false;
      return;
    }

    // Update user data
    user.name = newName;
    if (newPassword) {
      user.password = newPassword;
    }

    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user
    authStore.currentUser = newName;
    localStorage.setItem('currentUser', newName);
    
    authStore.loading = false;
  },

  clearError: () => {
    authStore.error = null;
  }
};