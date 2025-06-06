import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log("\n[New log]:");

    const { email, password } = req.body;

    console.log("Initial Validation Completed.");

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("Email not in use.");
      throw new BadRequestError("No user found with this email.");
    }

    console.log("Email found, checking for password.");

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      console.log("Password found to be incorrect.");
      throw new BadRequestError("Invalid Credentials.");
    }

    console.log("Password matched.");

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    console.log("JWT created!");

    req.session = {
      jwt: userJwt,
    };

    console.log("Token sent to the user!");

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
