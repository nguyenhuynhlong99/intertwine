const USER_LOCAL_STORAGE_KEY = 'INTERTWINE_USER';

export function saveUser(user: unknown): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
