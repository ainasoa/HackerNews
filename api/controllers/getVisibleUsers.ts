import { Request, Response } from "express";
import { User } from "../models/tables";
import logger from "../services/logger";

export default async function getVisibleUsers(req: Request, res: Response) {
  try {
    const data = await User.findAll({
      where: { visibility: true },
      raw: true,
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    logger.info("users list");

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(500).json("Server error");
  }
}
