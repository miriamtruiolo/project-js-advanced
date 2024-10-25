const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importa il plugin

module.exports = {
  entry: './src/js/index.js', // Path al file principale
  output: {
    path: path.resolve(__dirname, 'dist'), // Cartella di output
    filename: 'bundle.js', // Nome del bundle
  },
  mode: 'production', // Modalità per ottimizzare il bundle
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Per i file CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Percorso al file HTML di input
      filename: 'index.html', // Nome del file HTML di output
    }),
  ],
};
