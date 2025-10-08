import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "my_super_secret";

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
