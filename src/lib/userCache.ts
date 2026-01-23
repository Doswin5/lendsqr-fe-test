import type { User } from "../types/user";

const k = (id: string) => `user:${id}`;

export function getCachedUser(id: string): User | null {
  try {
    const raw = localStorage.getItem(k(id));
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setCachedUser(user: User) {
  try {
    localStorage.setItem(k(user.id), JSON.stringify(user));
  } catch {
    
  }
}
