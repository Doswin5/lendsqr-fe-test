import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { apiWithMeta } from "../lib/api";

export function useUsers(page: number, pageSize: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, total } = await apiWithMeta<User[]>(
          `/users?_page=${page}&_limit=${pageSize}&_sort=createdAt&_order=desc`
        );

        if (!alive) return;

        setUsers(Array.isArray(data) ? data : []);

        
        if (total !== null && Number.isFinite(total)) {
          setTotal(total);
        }
        
      } catch (e: any) {
        if (!alive) return;
        setUsers([]);
        setError(e.message ?? "Failed to load users");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [page, pageSize]);

  return { users, total, loading, error };
}
