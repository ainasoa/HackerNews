import { Request, Response } from "express";
import { FavoriteStory } from "../models/tables";
import decodeToken from "../services/decodeToken";
import logger from "../services/logger";

export default async function getFavoriteStories(
  { headers }: Request,
  res: Response
) {
  try {
    const user = decodeToken(headers.authorization as string);

    const data = await FavoriteStory.findAll({
      where: {
        UserId: (user as any).id,
      },
      raw: true,
    });

    logger.info("Favorite stories list.");
    return res.status(200).json(data.map(({ storyId }: any) => storyId));
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      logger.warn(error);
      return res.status(400).json("Story already added");
    }

    logger.error(error);
    return res.status(500).json("Server error");
  }
}
