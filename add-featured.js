import fs from 'fs';
import { globSync } from 'glob';

const files = globSync('src/content/**/*.{md,mdx}');
let changed = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('featured:')) {
    // Find the second '---'
    const parts = content.split('---');
    if (parts.length >= 3) {
      parts[1] = parts[1] + 'featured: true\n';
      content = parts.join('---');
      fs.writeFileSync(file, content);
      changed++;
    }
  }
}
console.log(`Updated ${changed} files.`);
