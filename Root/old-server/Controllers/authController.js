import jwt from "jsonwebtoken";
import hashPassword from "../Utils/hashPassword.js";
import User from "../Models/user.js";
import { createHash } from "crypto";

export function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

export async function newUser(username, password, callback) {
  try {
    let hash = await hashPassword(password);
    await new User({
      username: username,
      password: hash,
    }).save();
    callback(null);
  } catch (err) {
    console.log(err.message);
    callback(err.message);
  }
}

export async function checkPassword(username, password, callback) {
  try {
    User.find({ username: username }).then((users) => {
      if (users.length == 0) {
        callback("username not found");
      } else {
        const user = users[0];
        const hash = createHash("sha256")
          .update(user.password.salt + password)
          .digest("hex");
        if (hash == user.password.hash) {
          callback(null);
        } else {
          callback("password incorrect");
        }
      }
    });
  } catch {
    callback(err);
  }
}

export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        next(err);
        return;
      }

      req.user = user;

      next();
    });
  } catch (err) {
    next(err);
  }
}

export async function getUsernameByToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (!err) {
      return user.username;
    }
    return err;
  });
}
