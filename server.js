const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});