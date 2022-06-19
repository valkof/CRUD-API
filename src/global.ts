import { IncomingMessage, ServerResponse } from "http";
import { v4, validate } from "uuid";

type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [];

export async function getAllUsers(req: any, res: any) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

export async function addUser(req: any, res: any) {
  try {
    const body = await getBodyResponse(req);
    const {username, age, hobbies} = JSON.parse(body);
    const user: User = {
      id: v4(),
      username,
      age,
      hobbies
    }
    if (!user.username || !user.age || !user.hobbies) {
      throw new Error();
    }
    users.push(user);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'Нет обязательных полей'}));
  };
}

export async function getUserById(req: IncomingMessage, res: ServerResponse) {
  try {
    const reqId: string = req.url.slice(11);
    if (!validate(reqId)) {
      throw new Error('400');
    };
    const userArray: User[] = users.filter((user: User) => {
      return user.id === reqId;
    });
    if (userArray.length == 0) {
      throw new Error('404');
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userArray[0]));
  } catch (e) {
    switch (e.message) {
      case '400':
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Неверный идентификатор'}));
        break;
      case '404':
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Такого пользователя нет'}));
        break;
      default:
        break;
    }    
  };
}

export async function updateUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const reqId: string = req.url.slice(11);
    if (!validate(reqId)) {
      throw new Error('400');
    };
    const userNum: number = users.findIndex((user: User) => {
      return user.id === reqId;
    });
    if (userNum < 0) {
      throw new Error('404');
    };

    const body = await getBodyResponse(req);
    const {username, age, hobbies} = JSON.parse(body);
    if (username) users[userNum].username = username;
    if (age) users[userNum].age = age;
    if (hobbies) users[userNum].hobbies = hobbies;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users[userNum]));
  } catch (e) {
    switch (e.message) {
      case '400':
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Неверный идентификатор'}));
        break;
      case '404':
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Такого пользователя нет'}));
        break;
      default:
        break;
    }    
  };
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const reqId: string = req.url.slice(11);
    if (!validate(reqId)) {
      throw new Error('400');
    };
    const userNum: number = users.findIndex((user: User) => {
      return user.id === reqId;
    });
    if (userNum < 0) {
      throw new Error('404');
    };

    users.splice(userNum, 1);

    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: `Пользователь ${reqId} удален`}));
  } catch (e) {
    switch (e.message) {
      case '400':
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Неверный идентификатор'}));
        break;
      case '404':
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Такого пользователя нет'}));
        break;
      default:
        break;
    }    
  };
}

async function getBodyResponse(req: any): Promise<string> {
  return new Promise((resolve: any, reject: any) => {
    try {
      let body = '';

      req.on('data', (chunk: any) => {
        body += chunk.toString();
      })
      req.on('end', () => {
        resolve(body);
      })
    } catch (e) {
      reject(e);
    };
  });
}