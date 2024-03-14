const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENVIRONMENT}` });

const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

const app = express();
const PORT = 3005;


app.use((req, res, next) => {
  bodyParser.json();
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Ruta para el login de usuario
app.post('/testLogin', async (req, res) => {
  logger.log("error", "This is an error message");
  logger.log("warn", "This is a warning message");
  logger.log("info", "This is an info message");
  logger.log("verbose", "This is a verbose message");
  logger.log("debug", "This is a debug message");
  logger.log("silly", "This is a silly message");
  res.send("Hello, world Logger!");
});




app.get('/healthcheck', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK MS LOG CORRIENDO' });
});

app.listen(PORT, () => {
  console.log('------------------------------------------');
  console.log(`Servidor iniciado en el puerto ${PORT}`);
  console.log(`ENV: ${process.env.NODE_ENVIRONMENT}`);
  console.log('DB: ' + process.env.DB_HOST);
  console.log(`Worker PID: ${process.pid}`);
  console.log('------------------------------------------');
});
