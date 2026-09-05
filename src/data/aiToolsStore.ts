export interface AiTool {
  name: string;
  url: string;
  logo: string | null;
}

export async function fetchAiTools(): Promise<AiTool[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/aiTools.json`, {
      cache: 'default',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = await res.json();
    return Array.isArray(parsed) ? (parsed as AiTool[]) : [];
  } catch {
    return [];
  }
}