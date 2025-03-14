import jwt, { Jwt } from "jsonwebtoken";

export default function decodeToken(token: string) {
  token = token.split(" ")[1];

  const { payload } = jwt.decode(token, {
    json: true,
    complete: true,
  }) as Jwt;

  return payload as { id: number } & ProfilType;
}
