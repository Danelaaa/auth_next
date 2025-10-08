import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");


if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath));
}

export function getUsers() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
export function getNextId() {
  const users = getUsers();
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map(u => u.id));
  return maxId + 1;
}