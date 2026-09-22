import { copyFile, mkdir, readFile, access } from 'node:fs/promises';

const source = new URL('../public/', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const files = [
  'index.html',
  'styles.css',
  'overrides.css',
  'modal.css',
  'script.js',
  'volvo-workshop.png',
];

// Verify that every local asset referenced by the HTML is included in the build.
const html = await readFile(new URL('index.html', source), 'utf8');
for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(reference)) continue;
  const filename = reference.split(/[?#]/)[0];
  if (!files.includes(filename)) throw new Error(`Missing build asset: ${filename}`);
  await access(new URL(filename, source));
}

await mkdir(output, { recursive: true });
await Promise.all(files.map((file) => copyFile(new URL(file, source), new URL(file, output))));
console.log(`Built ${files.length} static files in dist/.`);
