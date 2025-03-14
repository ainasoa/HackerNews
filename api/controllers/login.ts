import bcrypt from "bcrypt-ts";
import { Request, Response } from "express";
import { User } from "../models/tables";
import generateToken from "../services/generateToken";
import logger from "../services/logger";

export default async function login(
  { body }: Request<{}, {}, LoginType>,
  res: Response
) {
  try {
    const data = await User.findOne({
      where: { email: body.email },
      raw: true,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (data) {
      const { password, ...rest } = data as any;

      if (await bcrypt.compare(body.password, password)) {
        logger.info("Logged in");
        const accessToken = generateToken(rest);

        return res.status(200).json({ accessToken });
      }
    }

    logger.warn("Invalid credentials");

    return res.status(401).json("Invalid credentials");
  } catch (error: any) {
    logger.error(error);

    return res.status(500).json("Server error");
  }
}
