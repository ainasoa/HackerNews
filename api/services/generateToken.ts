import jwt from "jsonwebtoken";

export default function generateToken(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
}
