export async function fetchAPI<T>(
  url: string,
  options?: Omit<RequestInit, "body"> & { body?: unknown }
): Promise<T> {
  const { body, headers, method = "GET", ...rest } = options || {};

  const res = await fetch(url, {
    method,
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body:
      method === "GET" || method === "HEAD"
        ? undefined
        : body
        ? JSON.stringify(body)
        : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errorText}`);
  }

  return res.json() as Promise<T>;
}