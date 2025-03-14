import { Router } from "express";
import getVisibleUsers from "../controllers/getVisibleUsers";
import addOrRemoveFavoriteStory from "../controllers/addOrRemoveFavoriteStory";
import getFavoriteStories from "../controllers/getFavoriteStories";
import getProfil from "../controllers/getProfil";
import updateProfil from "../controllers/updateProfil";
import updatePassword from "../controllers/updatePassword";
import { makeValidateBody } from "express-class-validator";
import ProfilDto from "../dto/ProfilDto";
import PasswordDto from "../dto/PasswordDto";
import FavoriteStoryDto from "../dto/FavoriteStoryDto";
import jwtMiddleware from "../middleware/jwtMiddleware";
import uploader from "../services/uploader";

const privateRouter = Router();

privateRouter.use(jwtMiddleware);

privateRouter
  .get("/users", getVisibleUsers)
  .get("/profil", getProfil)
  .get("/favorite-stories", getFavoriteStories)
  .post(
    "/favorite-story",
    makeValidateBody(FavoriteStoryDto),
    addOrRemoveFavoriteStory
  )
  .patch("/profil", makeValidateBody(ProfilDto), updateProfil)
  .patch("/password", makeValidateBody(PasswordDto), updatePassword);

export default privateRouter;
