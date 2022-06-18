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