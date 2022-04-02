const esbuild = require('esbuild');
const fs = require('fs');

function delTest() {
  return new Promise((resolve, reject) => {
    fs.readdir('../', (err, files) => {
      if (files.includes('dist')) {
        fs.rmdir('../dist', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
      resolve();
    });
  })
}

// builds the src directory
function buildSrc() {
  return new Promise((resolve, reject) => {
    esbuild.build({
      entryPoints: ['./src/index.ts'],
      outfile: './dist/index.js',
      minify: true,
      bundle: true,
      target: 'es2017',
      format: 'cjs',
      sourcemap: true,
      watch: false,
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function main() {
  delTest()
  .then(buildSrc)
}

main();