import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  user: object;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@GoBarber:user');
    const token = localStorage.getItem('@GoBarber:token');

    if (user && token) {
      return { user: JSON.parse(user), token };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    localStorage.setItem('@GoBarber:token', token);

    setData({ user, token });
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    await api.post('users', {
      name,
      email,
      password,
      provider: true,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
