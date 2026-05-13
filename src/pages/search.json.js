import { getCollection } from 'astro:content';

export async function GET() {
  const recipes = await getCollection('recipes');
  const products = await getCollection('kitchen-finds');
  
  const searchIndex = [
    ...recipes.map(r => ({ 
      id: r.id, 
      title: r.data.title, 
      url: `/recipes/${r.id.replace(/\.mdx?$/, '')}`, 
      type: 'Recipe' 
    })),
    ...products.map(p => ({ 
      id: p.id, 
      title: p.data.title, 
      url: p.data.affiliateLink, 
      type: 'Product' 
    }))
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' }
  });
}
