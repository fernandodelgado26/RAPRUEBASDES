const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://fernando26delgado:fernando26delgado@usuario.h0mvisu.mongodb.net/empleados?retryWrites=true&w=majority&appName=Usuario', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('✅ Conexión exitosa a MongoDB Atlas');

    const todos = await Empleado.find();
    console.log('📋 Lista de usuarios en MongoDB:');
    todos.forEach((emp, i) => {
        console.log(` ${i + 1}. Usuario: ${emp.user} | Contraseña: ${emp.pass}`);
    });

}).catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
});

// Esquemas y modelos
const empleadoSchema = new mongoose.Schema({
    user: String,
    pass: String
});
const Empleado = mongoose.model('empleado', empleadoSchema, 'empleado');

const ticketSchema = new mongoose.Schema({
    departamento: String,
    area: String,
    linea: String,
    fecha: { type: Date, default: Date.now }
});
const Ticket = mongoose.model('ticket', ticketSchema, 'ticket');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta de login con validaciones
app.post('/login', async (req, res) => {
    const userInput = req.body.user.trim();
    const passInput = req.body.pass.trim();

    console.log('🟡 Login intentado con:', { user: userInput, pass: passInput });

    // Validaciones
    const userRegex = /^US\d{4}$/;
    const passRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;

    if (!userRegex.test(userInput)) {
        console.log('🔴 Usuario inválido');
        return res.send('❌ El usuario debe comenzar con "US" seguido de 4 dígitos. Ej: US1234');
    }

    if (!passRegex.test(passInput)) {
        console.log('🔴 Contraseña inválida');
        return res.send('❌ La contraseña debe tener al menos 7 caracteres e incluir al menos un carácter especial.');
    }

    try {
        const usuarioEncontrado = await Empleado.findOne({ user: userInput });

        if (!usuarioEncontrado) {
            console.log('🔴 Usuario no encontrado');
            return res.send('❌ El usuario no existe.');
        }

        if (usuarioEncontrado.pass === passInput) {
            console.log('🟢 Login exitoso:', usuarioEncontrado);
            return res.send('✅ Login exitoso. ¡Bienvenido!');
        } else {
            console.log('🔴 Contraseña incorrecta');
            return res.send('❌ Contraseña incorrecta.');
        }

    } catch (error) {
        console.error('❌ Error en la búsqueda:', error);
        res.status(500).send('Error interno del servidor.');
    }
});

// Ruta para guardar tickets
// Ruta para guardar tickets con validación de campos obligatorios
app.post('/api/ticket', async (req, res) => {
    const { departamento, area, linea } = req.body;

    // Validar que los campos no estén vacíos o undefined
    if (!departamento || !area || !linea) {
        console.log('🔴 Datos incompletos en el ticket:', req.body);
        return res.status(400).send('❌ Por favor, completa todos los campos: departamento, área y línea.');
    }

    try {
        const nuevoTicket = new Ticket({
            departamento,
            area,
            linea
        });

        await nuevoTicket.save();
        console.log('✅ Ticket guardado:', nuevoTicket);
        res.send('✅ Ticket enviado correctamente.');
    } catch (error) {
        console.error('❌ Error al guardar ticket:', error);
        res.status(500).send('❌ Error al guardar el ticket.');
    }
});


// Servidor
if (require.main === module) {
    app.listen(3000, () => {
        console.log('🚀 Servidor corriendo en http://localhost:3000/login.html');
    });
}

module.exports = app;
