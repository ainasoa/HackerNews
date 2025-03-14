import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import logger from "../services/logger";

export default function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers.authorization) {
      const [prefix, token] = req.headers.authorization.split(" ");
      const { JWT_PREFIXE, JWT_SECRET } = process.env;

      const isAuthorized =
        prefix === JWT_PREFIXE && jwt.verify(token, JWT_SECRET!);

      console.log(prefix, JWT_PREFIXE, JWT_SECRET);

      if (isAuthorized) {
        logger.info("token valid");
        return next();
      }
    }

    throw new Error("token invalid");
  } catch (error) {
    logger.error(error);

    return res.status(401).json("Unauthorized");
  }
}
