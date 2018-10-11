import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const config = {
  input: 'src/ElementVisibilityObserver.js',
  output: {
	name: 'ElementVisibilityObserver',
    file: 'dist/ElementVisibilityObserver.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      babelrc: true,
      presets: [
        [
          'env', {
            modules: false,
            targets: {
              browsers: ['last 2 versions']
            }
          }
        ]
      ]
    })
  ]
};

export default config;
