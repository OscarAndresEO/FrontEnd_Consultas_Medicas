//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/SistemaMuestrasMedicas'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/SistemaMuestrasMedicas/'}),
);

var port = process.env.PORT || 8080;

// Start the app by listening on the default Heroku port
app.listen(port, () => {
    console.log('Servidor corriendo en ', port);
});