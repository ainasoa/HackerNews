import { Router } from "express";
import updloader from "../services/uploader";

import { makeValidateBody } from "express-class-validator";
import RegisterDto from "../dto/RegisterDto";

import register from "../controllers/register";
import login from "../controllers/login";
import LoginDto from "../dto/LoginDto";

const publicRouter = Router();

publicRouter
  .post("/login", makeValidateBody(LoginDto), login)
  .post("/register", makeValidateBody(RegisterDto),  register);

export default publicRouter;
