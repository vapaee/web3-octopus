const fs = require('fs');
const path = require('path');

const packageDir = process.cwd();
const packageJsonPath = path.join(packageDir, 'package.json');
const versionFilePath = path.join(packageDir, 'src', 'version.ts');

try {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const versionFileContent = `export const version = '${pkg.version}';\n`;
  let current = null;
  try {
    current = fs.readFileSync(versionFilePath, 'utf8');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  if (current === versionFileContent) {
    console.log(`Version file is up to date: ${pkg.name}@${pkg.version}`);
  } else {
    fs.writeFileSync(versionFilePath, versionFileContent, 'utf8');
    console.log(`Output release: ${pkg.name}@${pkg.version}`);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
