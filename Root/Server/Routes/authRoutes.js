import { Router } from "express";
import { checkPassword, newUser } from "../Controllers/authController.js";
import { generateAccessToken } from "../Controllers/authController.js";
const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  await newUser(username, password, (err) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(JSON.stringify({ token: generateAccessToken(username) }));
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  checkPassword(username, password, (err) => {
    if (err) {
      res.send("error logging in");
    } else {
      res.send(JSON.stringify({ token: generateAccessToken(username) }));
    }
  });
});

router.post("/token", async (req, res) => {
  await authenticateToken(req, res, async (err) => {
    if (err) {
      res.sendStatus("error refreshing token");
    } else {
      let token = await generateToken(req.user.username);
      res.send(JSON.stringify({ token: token }));
    }
  });
});

export default router;
