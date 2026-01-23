import { useCallback, useEffect, useState } from "react";
import { apiWithMeta } from "../lib/api";

export function useUserStats() {
  const [state, setState] = useState({ total: 0, active: 0, loans: 0, savings: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [{ total }, { total: active }] = await Promise.all([
        apiWithMeta(`/users?_page=1&_limit=1`),
        apiWithMeta(`/users?status=active&_page=1&_limit=1`),
      ]);

      setState((s) => ({
        ...s,
        total: typeof total === "number" ? total : s.total,
        active: typeof active === "number" ? active : s.active,
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, loading, refresh };
}
