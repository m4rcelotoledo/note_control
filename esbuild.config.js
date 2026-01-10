// esbuild configuration for Rails with React + TypeScript support
const esbuild = require('esbuild');
const path = require('path');

const isProduction = process.env.RAILS_ENV === 'production';
const isWatch = process.argv.includes('--watch');

const baseConfig = {
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  publicPath: '/assets',
  format: 'esm',
  sourcemap: !isProduction,
  minify: isProduction,
  target: 'esnext',
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx',
  },
  jsx: 'automatic',
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
  },
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(baseConfig);
      await ctx.watch();
      console.log('👀 Watching for changes...');
    } else {
      await esbuild.build(baseConfig);
      console.log('✅ Build complete!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
