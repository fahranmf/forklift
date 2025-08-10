// utils/issueJwt.js
import jwt from "jsonwebtoken";
export default function issueJwt(user) {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    roles: (user.roles || []).map(r => r.role?.slug || r),
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1d",
    issuer: "forklift-api",
    audience: "forklift-web",
  });
}
