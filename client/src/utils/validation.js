// Simple, reusable validation functions
export const validate = {
    name: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.length < 2) return 'Name too short';
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
      return '';
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Minimum 6 characters';
      return '';
    },
    confirmPassword: (pass, confirm) => {
      if (pass !== confirm) return 'Passwords must match';
      return '';
    }
  };