export default async function handler(req, res) {
  const { id, category, platform, sortBy } = req.query;

  try {
    let url = 'https://www.freetogame.com/api';

    if (id) {
      url += `/game?id=${id}`;
    } else {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (platform) params.append('platform', platform);
      if (sortBy) params.append('sort-by', sortBy);
      const query = params.toString() ? `?${params.toString()}` : '';
      url += `/games${query}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error de API: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al conectar con la API' });
  }
}