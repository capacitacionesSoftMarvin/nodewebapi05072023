const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const hostname = '127.0.0.1';
app.use(bodyParser.json());

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practica2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("Database connection succesful"));
// Definir el esquema del modelo
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

// Definir el modelo basado en el esquema
const Student = mongoose.model('Student', studentSchema);

// Obtener todos los estudiantes
app.get('/students', (req, res) => {
    Student.find({})
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor.' });
      });
  });
  
  

// Agregar un nuevo estudiante
app.post('/students', (req, res) => {
    const { name, age, grade } = req.body;
    const newStudent = new Student({ name, age, grade });
  
    newStudent.save()
      .then((student) => {
        res.status(201).json(student);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor.' });
      });
  });

// Obtener un estudiante por ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
  
    Student.findById(id)
      .then((student) => {
        if (!student) {
          res.status(404).json({ error: 'No se encontró el estudiante.' });
        } else {
          res.json(student);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor.' });
      });
  });
  

// Actualizar un estudiante existente
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, grade } = req.body;
  
    Student.findByIdAndUpdate(id, { name, age, grade }, { new: true })
      .then((student) => {
        if (!student) {
          res.status(404).json({ error: 'No se encontró el estudiante.' });
        } else {
          res.json(student);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor.' });
      });
  });

// Eliminar un estudiante
app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
  
    Student.findOneAndDelete({ _id: id })
      .then((student) => {
        if (!student) {
          res.status(404).json({ error: 'No se encontró el estudiante.' });
        } else {
          res.json(student);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor.' });
      });
  });
  

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
