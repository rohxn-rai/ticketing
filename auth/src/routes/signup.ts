import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage("Password must be between 8 and 32 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log("\n[New log]:");

    const { email, password } = req.body;

    console.log("Initial Validation Completed.");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email in use!");
      throw new BadRequestError("Email in use");
    }

    console.log("Email not in use, creating a new user.");

    const user = User.build({ email, password });
    await user.save();

    console.log("User data saved in database.");

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    console.log("JWT created!");

    req.session = {
      jwt: userJwt,
    };

    console.log("Token sent to the user!");

    res.status(201).send(user);
  }
);

export { router as signupRouter };
