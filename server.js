const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'tu_clave_secreta'; // Usa una clave segura

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.HOST, 
  user: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DB
});

// Ruta de login
app.post('/api/login', (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const query = `
    SELECT * FROM users 
    WHERE (username = ? OR mail = ?) AND password = ?
    LIMIT 1
  `;
  connection.query(query, [usernameOrEmail, usernameOrEmail, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length > 0) {
      // Genera el token con expiración de 1 hora
      const token = jwt.sign(
        { id: results[0].id, username: results[0].username, mail: results[0].mail },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Rutas para archivos HTML principales
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/courses', (req, res) => res.sendFile(path.join(__dirname, 'public', 'courses.html')));
app.get('/elements', (req, res) => res.sendFile(path.join(__dirname, 'public', 'elements.html')));
app.get('/news', (req, res) => res.sendFile(path.join(__dirname, 'public', 'news.html')));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});