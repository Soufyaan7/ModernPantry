import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    recipes: collection({
      label: 'Recipes',
      slugField: 'title',
      path: 'src/content/recipes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        author: fields.text({ label: 'Author', defaultValue: 'YumCraft' }),
        publishDate: fields.date({ label: 'Publish Date' }),
        category: fields.text({ label: 'Category' }),
        description: fields.text({ label: 'Description', multiline: true }),
        ingredients: fields.array(fields.text({ label: 'Ingredient' }), {
          label: 'Ingredients',
          itemLabel: props => props.value,
        }),
        directions: fields.array(fields.text({ label: 'Direction Step', multiline: true }), {
          label: 'Directions',
          itemLabel: props => props.value,
        }),
        relatedEquipment: fields.array(fields.text({ label: 'Related Equipment Slug' }), {
          label: 'Related Equipment',
          itemLabel: props => props.value,
        }),
        image: fields.text({ label: 'Image URL' }),
        rating: fields.number({ label: 'Rating (1-5)', defaultValue: 5 }),
        time: fields.text({ label: 'Preparation Time' }),
        featured: fields.checkbox({ label: 'Featured on Homepage', defaultValue: false }),
        content: fields.markdoc({ label: 'Recipe Content' }),
      },
    }),
    kitchenFinds: collection({
      label: 'Kitchen Finds',
      slugField: 'title',
      path: 'src/content/kitchen-finds/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({ label: 'Publish Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        price: fields.number({ label: 'Price' }),
        affiliateLink: fields.text({ label: 'Affiliate Link' }),
        shippingType: fields.text({ label: 'Shipping Type' }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Features',
          itemLabel: props => props.value,
        }),
        image: fields.text({ label: 'Image URL' }),
        featured: fields.checkbox({ label: 'Featured on Homepage', defaultValue: false }),
        content: fields.markdoc({ label: 'Review Content' }),
      },
    }),
  },
});
