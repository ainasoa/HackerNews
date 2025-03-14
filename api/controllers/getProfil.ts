import { Request, Response } from "express";
import { User } from "../models/tables";
import decodeToken from "../services/decodeToken";
import logger from "../services/logger";

export default async function getProfil(req: Request, res: Response) {
  try {
    const user: any = decodeToken(req.headers.authorization as string);
    const data = await User.findByPk(user?.id, {
      raw: true,
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "id"],
      },
    });

    logger.info("profil fetched");

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(500).json("Server error");
  }
}
