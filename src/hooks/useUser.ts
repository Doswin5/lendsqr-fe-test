import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { User, UserStatus } from "../types/user";
import { api } from "../lib/api";
import { getCachedUser, setCachedUser } from "../lib/userCache";

export function useUser() {
  const { id } = useParams();
  const userId = useMemo(() => id ?? "", [id]);

  const [user, setUser] = useState<User | null>(() =>
    userId ? getCachedUser(userId) : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await api<User>(`/users/${userId}`);

        if (!alive) return;
        setUser(data);
        setCachedUser(data);
      } catch (e: any) {
        if (!alive) return;

        const cached = getCachedUser(userId);
        if (cached) {
          setUser(cached);
        } else {
          setError(e.message ?? "Failed to load user");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [userId]);

  const setStatus = async (status: UserStatus) => {
    if (!userId) return;

    setUser((u) => (u ? { ...u, status } : u));

    try {
      const updated = await api<User>(`/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setUser(updated);
      setCachedUser(updated);
    } catch {
      const fresh = await api<User>(`/users/${userId}`);
      setUser(fresh);
      setCachedUser(fresh);
    }
  };

  return {
    user,
    loading,
    error,
    blacklist: () => setStatus("blacklisted"),
    activate: () => setStatus("active"),
    setStatus,
  };
}
