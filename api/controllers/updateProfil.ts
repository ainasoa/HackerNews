import { Request, Response } from "express";
import { User } from "../models/tables";
import decodeToken from "../services/decodeToken";
import logger from "../services/logger";

export default async function updateProfil(
  req: Request<{}, {}, ProfilType>,
  res: Response
) {
  try {
    const user: any = decodeToken(req.headers.authorization as string);

    await User.update(req.body, {
      where: { id: user.id },
    });

    logger.info("Profil updated");

    return res.status(200).json("Profil updated");
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json("Server error");
  }
}
