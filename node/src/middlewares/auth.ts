import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

  const token = req.headers['authorization']?.split(" ")[1];

  if(!token) {
    return res.status(401).send("Unauthorized, missing token");
  }

  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  jwt.verify(token, jwtSecretKey, (error, decoded) => {
    if(error) {
      return res.status(401).send("Unauthorized, expired or invalid token");
    }
    req.currentUserId = decoded.userId;
    return next();
  });
};
