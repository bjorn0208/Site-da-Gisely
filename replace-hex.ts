import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/\[#155dfc\]/g, 'primary');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk('./src');
console.log('Replaced hex successfully!');
