const USER_LOCAL_STORAGE_KEY = 'INTERTWINE_USER';
export const BROKEN_LINK_IMG = 'https://bit.ly/broken-link';

export function saveToken(token: unknown): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(token));
}

export function getToken() {
  const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return token ? JSON.parse(token) : null;
}

export function removeToken(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
