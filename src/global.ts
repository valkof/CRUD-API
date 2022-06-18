import { v4 } from "uuid";

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