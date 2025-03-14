import { NextFunction, Request, Response } from "express";
import logger from "../services/logger";

export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(req.url);
  next();
}
