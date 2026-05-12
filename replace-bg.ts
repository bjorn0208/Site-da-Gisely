import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Let's replace solid bg-primary with bg-primary-dark, but not bg-primary/
      content = content.replace(/bg-primary(?![\/\-\w])/g, 'bg-primary-dark');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk('./src');
console.log('Replaced bg-primary with bg-primary-dark successfully!');
