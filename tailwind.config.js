module.exports = {
  purge: {
    enabled: true,
    content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/*.jsx',
    './src/*.js',
    './src/**/*.js',
  ],
},
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['odd', 'even']
  },
  plugins: [],
}
