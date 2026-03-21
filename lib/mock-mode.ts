export function isMockMode() {
  return process.env.MOCK_MODE === "1" || !process.env.DATABASE_URL;
}

export async function withMockFallback<T>(load: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await load();
  } catch (error) {
    console.error(`Falling back to mock data for ${label}.`, error);
    return fallback;
  }
}
