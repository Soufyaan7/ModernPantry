import { getCollection } from 'astro:content';

// Helper: validate that a string is a safe internal or external URL
function sanitizeUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url, 'http://localhost');
    // Only allow http/https/relative
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return url;
  } catch {
    // Relative URL — always safe
    return url.startsWith('/') ? url : null;
  }
}

export async function GET() {
  const recipes = await getCollection('recipes');
  const products = await getCollection('kitchen-finds');

  const searchIndex = [
    ...recipes.map(r => ({
      id: r.id,
      // Strip HTML/script from title just in case
      title: String(r.data.title).replace(/<[^>]*>/g, ''),
      url: `/recipes/${r.id.replace(/\.mdx?$/, '')}`,
      type: 'Recipe',
    })),
    ...products.map(p => ({
      id: p.id,
      title: String(p.data.title).replace(/<[^>]*>/g, ''),
      // Products now link to internal review page
      url: `/kitchen-finds/${p.id.replace(/\.mdx?$/, '')}`,
      type: 'Product',
    })),
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' },
  });
}
