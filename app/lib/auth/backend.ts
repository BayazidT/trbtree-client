const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not configured");
}

export async function backendFetch(
  path: string,
  options: RequestInit = {}
) {
    console.log(BACKEND_API_URL);
  return fetch(`http://localhost:8081/trbtree-service/api/v1/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });
}