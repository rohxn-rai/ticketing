import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  console.log("\n[New log]:");

  req.session = null;

  console.log("Signed out the user!");

  res.send({});
});

export { router as signoutRouter };
