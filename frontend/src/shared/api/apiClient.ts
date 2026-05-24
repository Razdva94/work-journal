export function getBackendUrl(): string {
  const url = import.meta.env.VITE_BACKEND_URL?.trim();
  if (!url) {
    return '';
  }
  return url.replace(/\/+$/, '');
}

export async function readErrorBody(response: Response): Promise<string> {
  const text = await response.text();
  return text.length > 500 ? `${text.slice(0, 500)}...` : text;
}
