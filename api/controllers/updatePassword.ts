import { Request, Response } from "express";
import { User } from "../models/tables";
import decodeToken from "../services/decodeToken";
import logger from "../services/logger";

export default async function updatePassword(
  req: Request<{}, {}, PasswordType>,
  res: Response
) {
  try {
    const user: any = decodeToken(req.headers.authorization as string);

    await User.update(req.body, {
      where: { id: user.id },
    });

    logger.info("Password updated");

    return res.status(200).json("Password updated");
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json("Server error");
  }
}
