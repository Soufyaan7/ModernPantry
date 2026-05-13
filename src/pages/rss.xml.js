import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const recipes = await getCollection('recipes');
	return rss({
		title: 'The Modern Pantry',
		description: 'Kitchen Finds & Recipes',
		site: context.site || 'http://localhost:4321',
		items: recipes.map((recipe) => ({
			title: recipe.data.title,
			pubDate: recipe.data.publishDate,
			description: recipe.data.description,
			link: `/recipes/${recipe.id.replace(/\.mdx?$/, '')}/`,
		})),
	});
}
