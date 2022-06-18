import { createServer } from "http";
import { env } from "process";
import 'dotenv/config';
import { addUser, getAllUsers } from "./global";

const server = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    addUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'Неверный запрос'}));
  }
  
});

const port = env.PORT || 5000;

server.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
