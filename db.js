const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      // Cambia si tu DB está en otro host
  user: 'tu_usuario',     // Tu usuario de MySQL
  password: 'tu_contraseña', // Tu contraseña de MySQL
  database: 'nombre_base' // El nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

module.exports = connection;