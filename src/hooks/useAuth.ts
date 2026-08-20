import { useState } from 'react';
import * as authService from '../services/authService';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());

  function login(usuario: string, password: string): boolean {
    const ok = authService.login(usuario, password);
    setIsAuthenticated(ok);
    return ok;
  }

  function logout() {
    authService.logout();
    setIsAuthenticated(false);
  }

  return { isAuthenticated, login, logout };
}
