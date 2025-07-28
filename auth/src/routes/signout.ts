import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  console.log(`${new Date().toLocaleString()} - User signed out!`);

  res.send({});
});

export { router as signoutRouter };
