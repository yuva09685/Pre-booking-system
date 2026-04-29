import {copyFileSync, cpSync, existsSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');
const docsDir = join(root, 'docs');

if (!existsSync(outDir)) {
  throw new Error('Missing out directory. Run next build first.');
}

rmSync(docsDir, {recursive: true, force: true});
mkdirSync(docsDir, {recursive: true});
cpSync(outDir, docsDir, {recursive: true});

// Prevent GitHub Pages from running Jekyll processing.
writeFileSync(join(docsDir, '.nojekyll'), '');

// Support hard refresh on nested routes in static hosting.
const notFoundPath = join(outDir, '404.html');
if (existsSync(notFoundPath)) {
  copyFileSync(notFoundPath, join(docsDir, '404.html'));
}

console.log('Copied static export from out/ to docs/ for branch deployment.');
