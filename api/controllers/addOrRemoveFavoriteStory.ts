import { Request, Response } from "express";
import { FavoriteStory } from "../models/tables";
import decodeToken from "../services/decodeToken";
import logger from "../services/logger";

export default async function addOrRemoveFavoriteStory(
  { body, headers }: Request<{}, {}, FavoriteType>,
  res: Response
) {
  try {
    const user = decodeToken(headers.authorization!);

    switch (body.action) {
      case "add":
        await FavoriteStory.create({
          storyId: body.storyId,
          UserId: user.id,
        });

        logger.info("Favorite story added successfully.");
        return res.status(201).json("Favorite story added successfully.");

      case "remove":
        await FavoriteStory.destroy({
          where: { storyId: body.storyId },
        });

        logger.info("Favorite story removed successfully.");
        return res.status(200).json("Favorite story removed successfully.");
      default:
        throw new Error("Invalid action");
    }
  } catch (error: any) {
    if (error.name == "SequelizeUniqueConstraintError") {
      logger.warn(error);
      return res.status(400).json("Story already added");
    }

    logger.error(error);
    return res.status(500).json("Server error");
  }
}
