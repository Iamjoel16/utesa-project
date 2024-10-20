import express, { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import knexConfig from './knexfile';
import Knex from 'knex';

const app = express();
const PORT = 5000;

// Crear instancia de Knex
const db = Knex(knexConfig);

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para procesar mensajes de contacto
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña'
      }
    });

    const mailOptions = {
      from: email,
      to: 'destinatario@ejemplo.com',
      subject: `Mensaje de Contacto de ${name}`,
      text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el mensaje' });
      }
      console.log('Correo enviado:', info.response);
      res.status(201).json({ message: 'Mensaje enviado con éxito' });
    });
  } catch (err) {
    console.error('Error al procesar el mensaje de contacto:', err);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
});

// Ruta para buscar proyectos
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;

    // Realizar búsqueda en la base de datos MySQL
    const results = await db('projects')
      .where('title', 'like', `%${query}%`)
      .orWhere('author', 'like', `%${query}%`);

    res.status(200).json(results);
  } catch (err) {
    console.error('Error al realizar la búsqueda:', err);
    res.status(500).json({ message: 'Error al realizar la búsqueda' });
  }
});

// Ruta para subir proyectos
app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const { title, author, career, year, fileUrl } = req.body;

    // Insertar nuevo proyecto en MySQL
    await db('projects').insert({
      title,
      author,
      career,
      year,
      fileUrl
    });

    res.status(201).json({ message: 'Proyecto subido con éxito' });
  } catch (err) {
    console.error('Error al subir el proyecto:', err);
    res.status(500).json({ message: 'Error al subir el proyecto' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
