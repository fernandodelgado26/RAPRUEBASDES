const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Importa tu app
const app = require('./server'); // Asegúrate de exportar `app` desde tu server.js

// ⚠️ Puedes usar una base de datos de prueba o mockear las consultas de Mongo
beforeAll(async () => {
  // O conecta a una base de datos de prueba con MongoMemoryServer, por ejemplo
});

afterAll(async () => {
  await mongoose.disconnect();
});

// ✅ PRUEBAS DE LOGIN
describe('POST /login', () => {
  test('debe fallar con usuario inválido', async () => {
    const response = await request(app).post('/login').send({
      user: 'INVALIDO',
      pass: 'Password123!'
    });

    expect(response.text).toMatch(/usuario debe comenzar/i);
  });

  test('debe fallar con contraseña inválida', async () => {
    const response = await request(app).post('/login').send({
      user: 'US1234',
      pass: 'abc123'
    });

    expect(response.text).toMatch(/contraseña debe tener/i);
  });

  test('debe fallar si usuario no existe', async () => {
    const response = await request(app).post('/login').send({
      user: 'US9999',
      pass: 'Valid@123'
    });

    expect(response.text).toMatch(/usuario no existe/i);
  });
});

// ✅ PRUEBA PARA /api/ticket
describe('POST /api/ticket', () => {
  test('debe guardar un ticket correctamente', async () => {
    const response = await request(app).post('/api/ticket').send({
      departamento: 'Producción',
      area: 'Área 1',
      linea: 'Línea A'
    });

    expect(response.text).toMatch(/ticket enviado/i);
  });
});
