import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "162.241.60.214", // Cambia esto por la dirección IP o nombre de host del servidor MySQL en cPanel
  user: "postvent_root", // Cambia esto por tu usuario MySQL en cPanel
  password: "ogxdL4M@V8ey", // Cambia esto por tu contraseña de MySQL en cPanel
  database: "postvent_Ventascine", // Cambia esto por el nombre de tu base de datos en cPanel
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
/*
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost", // Cambiar a la dirección IP o nombre de host de tu servidor MySQL local
  user: "root",
  password: "102004",
  database: "login",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
*/