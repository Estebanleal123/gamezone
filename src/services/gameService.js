async function apiFetch(endpoint) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { data: null, error: 'La solicitud tardó demasiado. Intenta de nuevo.' };
    }
    return { data: null, error: err.message || 'Error desconocido.' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchGames({ category, platform, sortBy } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (platform && platform !== 'all') params.append('platform', platform);
  if (sortBy && sortBy !== 'default') params.append('sortBy', sortBy);
  const query = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/api/games${query}`);
}

export async function fetchGameById(id) {
  const { data, error } = await apiFetch(`/api/games?id=${id}`);
  if (error) return { data: null, error };

  const related = await apiFetch(`/api/games?category=${data.genre}`);
  const relatedGames = related.data?.filter((g) => g.id !== data.id).slice(0, 4) || [];

  return { data: { ...data, related: relatedGames }, error: null };
}

export async function fetchFeaturedGames() {
  const { data, error } = await apiFetch('/api/games?sortBy=relevance');
  if (error) return { data: null, error };
  return { data: data?.slice(0, 8) || [], error: null };
}

export const GENRES = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports',
  'sandbox', 'survival', 'battle-royale', 'card', 'fighting',
  'fantasy', 'sci-fi', 'action',
];

export const PLATFORMS = [
  { value: 'pc', label: '🖥️ PC' },
  { value: 'browser', label: '🌐 Navegador' },
];