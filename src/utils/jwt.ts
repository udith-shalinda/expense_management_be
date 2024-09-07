import jwt from "jsonwebtoken";

const secret = "your-secret-key";

export const createToken = (userId: string): string => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
