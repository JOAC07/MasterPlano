import { siteConfig } from '../config/env';

const STORAGE_KEY = 'loteo:admin-session';

export function login(usuario: string, password: string): boolean {
  const ok = usuario === siteConfig.adminUsuario && password === siteConfig.adminPassword;
  if (ok) localStorage.setItem(STORAGE_KEY, '1');
  return ok;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEY) === '1';
}
