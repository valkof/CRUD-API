import request from "supertest";
import { server } from "./index"

const testUser1 = {
  username: 'Valera',
  age: 30,
  hobbies: ["Games", "Playes"]
}

const testUser2 = {
  username: 'Lena',
  age: 28,
  hobbies: ["Flowers"]
}

const testUser3 = {
  username: 'Dima',
  age: 10,
  hobbies: [""]
}

let idTestUser1: string;
let idTestUser2: string;


describe('Сценарий #1', () => {
  test('Проверяем БД (пусто)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([]);
  });

  test('Добавляем пользователя #1', async () => {
    const response = await request(server).post('/api/users').send(testUser1);
    expect(response.status).toBe(201);
    idTestUser1 = response.body.id;
    expect(response.body).toMatchObject(testUser1);
  });

  test('Добавляем пользователя #2', async () => {
    const response = await request(server).post('/api/users').send(testUser2);
    expect(response.status).toBe(201);
    idTestUser2 = response.body.id;
    expect(response.body).toMatchObject(testUser2);
  });

  test('Проверяем БД (2 пользователя)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });
});

describe('Сценарий #2', () => {
  test('Проверяем БД (2 пользователя)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });

  test('Удаляем пользователя #4 (404 - валидный id)', async () => {
    const response = await request(server).del(`/api/users/63b52638-660f-4613-9765-efd0d42ade8d`);
    expect(response.status).toBe(404);
  });

  test('Удаляем пользователя #5 (400 - невалидный id)', async () => {
    const response = await request(server).del(`/api/users/4568`);
    expect(response.status).toBe(400);
  });

  test('Проверяем БД (2 пользователя)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });
});

describe('Сценарий #3', () => {
  test('Проверяем БД (2 пользователя)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });

  test('Проверяем наличие пользователя #2', async () => {
    const response = await request(server).get(`/api/users/${idTestUser1}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testUser1);
  });

  test('Обновляем пользователя #2 данными пользователя #3', async () => {
    const response = await request(server).put(`/api/users/${idTestUser1}`).send(testUser3);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testUser3);
  });

  test('Проверяем БД (2 пользователя)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(2);
  });
});

server.close();