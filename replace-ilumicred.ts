import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/Ilumicred Soluções/g, 'Gisely Diniz Consultoria');
      content = content.replace(/Ilumicred/g, 'Gisely Diniz Consultoria');
      content = content.replace(/Dominic/g, 'Gisely');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk('./src');
walk('./');
console.log('Replaced text successfully!');
