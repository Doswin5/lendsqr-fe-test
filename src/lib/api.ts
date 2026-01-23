export const API_BASE =
  import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export async function apiWithMeta<T>(
  path: string,
  init?: RequestInit
): Promise<{ data: T; total: number | null }> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  const totalHeader = res.headers.get("X-Total-Count");
  const total = totalHeader ? parseInt(totalHeader, 10) : null;

  const json = await res.json();

  if (Array.isArray(json)) {
    return { data: json as T, total: Number.isFinite(total ?? NaN) ? total : null };
  }

  const data = (json?.data ?? json?.users ?? json?.items ?? []) as T;

  const totalFromBody =
    typeof json?.total === "number"
      ? json.total
      : typeof json?.totalCount === "number"
      ? json.totalCount
      : null;

  return { data, total: total ?? totalFromBody };
}

