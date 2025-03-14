import { Request, Response } from "express";
import { User } from "../models/tables";
import generateToken from "../services/generateToken";
import logger from "../services/logger";

export default async function register(
  { body }: Request<{}, {}, RegisterType>,
  res: Response
) {
  try {
    const { dataValues } = await User.create(body);

    delete dataValues.password;

    logger.info("registered");

    const accessToken = generateToken(dataValues);

    return res.status(201).json({ accessToken });
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      logger.warn(error);

      return res.status(400).json("Email is already exist!");
    }
    logger.error(error);

    return res.status(500).json("Server error");
  }
}
