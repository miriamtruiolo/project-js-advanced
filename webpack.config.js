const path = require('path');

module.exports = {
  entry: './src/js/index.js', // Path al file principale
  output: {
    path: path.resolve(__dirname, 'dist'), // Cartella di output
    filename: 'bundle.js', // Nome del bundle
    publicPath: '/', // Usato per i percorsi relativi
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
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
